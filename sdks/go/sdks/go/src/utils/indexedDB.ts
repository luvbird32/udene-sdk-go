const DB_NAME = 'udeneDB';
const DB_VERSION = 1;

interface DBSchema {
  apiResponses: {
    key: string;
    value: any;
    expires: number;
  };
  userPreferences: {
    key: string;
    value: any;
  };
}

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Store for caching API responses
      if (!db.objectStoreNames.contains('apiResponses')) {
        const store = db.createObjectStore('apiResponses', { keyPath: 'key' });
        store.createIndex('expires', 'expires');
      }

      // Store for user preferences
      if (!db.objectStoreNames.contains('userPreferences')) {
        db.createObjectStore('userPreferences', { keyPath: 'key' });
      }
    };
  });
};

export const setItem = async <T extends keyof DBSchema>(
  storeName: T,
  key: string,
  value: DBSchema[T]['value'],
  expires?: number
): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put({
      key,
      value,
      ...(expires && { expires }),
    });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

export const getItem = async <T extends keyof DBSchema>(
  storeName: T,
  key: string
): Promise<DBSchema[T]['value'] | null> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const data = request.result;
      if (!data) {
        resolve(null);
        return;
      }

      if (data.expires && data.expires < Date.now()) {
        // Remove expired data
        const deleteTransaction = db.transaction(storeName, 'readwrite');
        const deleteStore = deleteTransaction.objectStore(storeName);
        deleteStore.delete(key);
        resolve(null);
        return;
      }

      resolve(data.value);
    };
  });
};

export const removeItem = async (storeName: keyof DBSchema, key: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

export const clearStore = async (storeName: keyof DBSchema): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Helper function to clean up expired items
export const cleanupExpiredItems = async (): Promise<void> => {
  const db = await initDB();
  const transaction = db.transaction('apiResponses', 'readwrite');
  const store = transaction.objectStore('apiResponses');
  const index = store.index('expires');
  const now = Date.now();

  return new Promise((resolve, reject) => {
    const request = index.openCursor(IDBKeyRange.upperBound(now));
    
    request.onerror = () => reject(request.error);
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        store.delete(cursor.primaryKey);
        cursor.continue();
      } else {
        resolve();
      }
    };
  });
};