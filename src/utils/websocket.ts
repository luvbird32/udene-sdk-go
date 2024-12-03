type WebSocketCallback = (data: any) => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private callbacks: WebSocketCallback[] = [];

  // Disabled constructor - will not attempt connections
  constructor(private url: string) {}

  // Disabled connect method
  connect() {
    console.log('WebSocket connections temporarily disabled');
    return;
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

export const wsClient = new WebSocketClient(`ws://${window.location.hostname}:8000/ws`);