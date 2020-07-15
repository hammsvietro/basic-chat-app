import express from 'express';
import http from 'http';
import cors from 'cors';
import socketIo from 'socket.io';
import socketHandling from './socket';


class App {
  private app: express.Application;
  public server: http.Server;
  private io: SocketIO.Server;

  constructor() {
    this.app = express();
    this.security();
    this.server=http.createServer(this.app);
    this.io = socketIo(this.server);
    this.io.origins('*:*');
    this.sockets();
  }

  private security(): void {
    this.app.use(cors());

  } 

  private sockets(): void {
    socketHandling(this.io);
  }
}

export default new App().server;