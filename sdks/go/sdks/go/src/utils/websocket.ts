type WebSocketCallback = (data: any) => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private callbacks: WebSocketCallback[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private secure: boolean;

  constructor() {
    // Determine if we need secure WebSocket based on the current protocol
    this.secure = window.location.protocol === 'https:';
    console.log(`Initializing WebSocket client (secure: ${this.secure})`);
  }

  connect() {
    try {
      if (this.ws) {
        console.log('WebSocket connection already exists');
        return;
      }

      // Construct WebSocket URL using current host and protocol
      const protocol = this.secure ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}`;
      console.log(`Connecting to WebSocket at ${wsUrl}`);

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connection established');
        this.reconnectAttempts = 0;
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
          console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
          setTimeout(() => this.connect(), delay);
        } else {
          console.error('Max reconnection attempts reached');
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.callbacks.forEach(callback => callback(data));
        } catch (error) {
          console.error('Error processing WebSocket message:', error);
        }
      };
    } catch (error) {
      console.error('Error establishing WebSocket connection:', error);
      // Attempt to reconnect if connection fails
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
        setTimeout(() => this.connect(), delay);
      }
    }
  }

  subscribe(callback: WebSocketCallback) {
    this.callbacks.push(callback);
    // Connect if this is the first subscriber
    if (this.callbacks.length === 1) {
      this.connect();
    }
  }

  unsubscribe(callback: WebSocketCallback) {
    this.callbacks = this.callbacks.filter(cb => cb !== callback);
    // Disconnect if there are no more subscribers
    if (this.callbacks.length === 0) {
      this.disconnect();
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.callbacks = [];
    this.reconnectAttempts = 0;
  }
}

// Create a single instance of the WebSocket client
export const wsClient = new WebSocketClient();