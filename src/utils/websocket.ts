type WebSocketCallback = (data: any) => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private callbacks: WebSocketCallback[] = [];

  constructor(private url: string) {}

  connect() {
    // Ensure we're using wss:// for secure connections
    const secureUrl = this.url.replace('ws://', 'wss://');
    
    try {
      this.ws = new WebSocket(secureUrl);
      
      this.ws.onmessage = (event) => {
        this.callbacks.forEach(callback => callback(event.data));
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
    }
  }

  subscribe(callback: WebSocketCallback) {
    this.callbacks.push(callback);
  }

  unsubscribe(callback: WebSocketCallback) {
    this.callbacks = this.callbacks.filter(cb => cb !== callback);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.callbacks = [];
  }
}

// Initialize with secure WebSocket URL
export const wsClient = new WebSocketClient(`wss://${window.location.hostname}:8000/ws`);