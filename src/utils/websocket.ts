type WebSocketCallback = (data: any) => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private callbacks: WebSocketCallback[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(private url: string) {}

  connect() {
    // Determine if we should use secure WebSocket based on the current protocol
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.hostname;
    const port = import.meta.env.PROD ? '' : ':8000';
    const wsUrl = `${protocol}//${host}${port}/ws`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.callbacks.forEach(callback => callback(data));
    };

    this.ws.onclose = () => {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connect();
        }, this.reconnectDelay * Math.pow(2, this.reconnectAttempts));
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
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
    this.reconnectAttempts = 0;
  }
}

export const wsClient = new WebSocketClient(`ws://${window.location.hostname}:8000/ws`);