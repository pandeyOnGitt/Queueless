import { Server } from 'socket.io';
export declare class WebsocketGateway {
    server: Server;
    publishQueueUpdate(serviceId: string, payload: Record<string, unknown>): void;
}
