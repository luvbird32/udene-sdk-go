import { io, Socket } from "socket.io-client";

type WebSocketCallback = (data: any) => void;

class WebSocketClient {
  private socket: Socket | null = null;
  private callbacks: WebSocketCallback[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(private url: string) {}

  connect() {
    this.socket = io(this.url, {
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.reconnectAttempts = 0;
    });

    this.socket.on('fraud_alert_broadcast', (data) => {
      this.callbacks.forEach(callback => callback(data));
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  }

  subscribe(callback: WebSocketCallback) {
    this.callbacks.push(callback);
  }

  unsubscribe(callback: WebSocketCallback) {
    this.callbacks = this.callbacks.filter(cb => cb !== callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.callbacks = [];
    this.reconnectAttempts = 0;
  }

  // Method to emit events to the server
  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

export const wsClient = new WebSocketClient('http://localhost:8000');