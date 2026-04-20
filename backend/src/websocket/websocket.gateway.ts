import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  publishQueueUpdate(serviceId: string, payload: Record<string, unknown>) {
    this.server.to(serviceId).emit('queue.updated', payload);
    this.server.emit('queue.updated', payload);
  }
}
