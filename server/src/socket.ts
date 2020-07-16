import socketIo from 'socket.io';
import IMessage from './models/message';

export default function socket(io: SocketIO.Server) {
  io.on('connection', (socket: socketIo.Socket) => {
    console.log('client connected');
    socket.on('message', (data: IMessage) => {
      console.log(`emmiting message => ${data.content}`);
      io.emit('message', data);
    });
    
    

    socket.on('disconnect', (data) => {
      console.log('client disconnected');
    });
  });
}