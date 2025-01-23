type WebSocketCallback = (data: any) => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private callbacks: WebSocketCallback[] = [];

  constructor(private url: string) {
    // Convert ws:// to wss:// if we're on HTTPS
    this.url = this.url.replace('ws://', 'wss://');
  }

  connect() {
    try {
      if (this.ws) {
        this.ws.close();
      }

      console.log('Attempting WebSocket connection to:', this.url);
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('WebSocket connection established');
      };

      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
        // Attempt to reconnect after 5 seconds
        setTimeout(() => this.connect(), 5000);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onmessage = (event) => {
        this.callbacks.forEach(callback => callback(event.data));
      };
    } catch (error) {
      console.error('Error establishing WebSocket connection:', error);
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

// Use secure WebSocket URL with wss:// protocol
export const wsClient = new WebSocketClient(`wss://${window.location.hostname}:8000/ws`);