import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers: Map<number, string[]> = new Map();

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
      
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);
      const userId = payload.sub;

      // Store the connection
      const userSockets = this.connectedUsers.get(userId) || [];
      userSockets.push(client.id);
      this.connectedUsers.set(userId, userSockets);

      // Join user-specific room
      client.join(`user-${userId}`);
      
      console.log(`User ${userId} connected with socket ${client.id}`);
    } catch (error) {
      console.error('WebSocket connection error:', error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // Remove from connected users
    for (const [userId, sockets] of this.connectedUsers.entries()) {
      const index = sockets.indexOf(client.id);
      if (index !== -1) {
        sockets.splice(index, 1);
        if (sockets.length === 0) {
          this.connectedUsers.delete(userId);
        } else {
          this.connectedUsers.set(userId, sockets);
        }
        console.log(`User ${userId} disconnected socket ${client.id}`);
        break;
      }
    }
  }

  @SubscribeMessage('join-expression')
  handleJoinExpression(client: Socket, expressionId: number) {
    client.join(`expression-${expressionId}`);
    console.log(`Socket ${client.id} joined expression-${expressionId}`);
  }

  @SubscribeMessage('leave-expression')
  handleLeaveExpression(client: Socket, expressionId: number) {
    client.leave(`expression-${expressionId}`);
    console.log(`Socket ${client.id} left expression-${expressionId}`);
  }

  // Send notification to specific user
  sendToUser(userId: number, event: string, data: any) {
    this.server.to(`user-${userId}`).emit(event, data);
  }

  // Send notification to all users in an expression discussion
  sendToExpression(expressionId: number, event: string, data: any) {
    this.server.to(`expression-${expressionId}`).emit(event, data);
  }

  // Send notification to multiple users
  sendToUsers(userIds: number[], event: string, data: any) {
    userIds.forEach(userId => {
      this.sendToUser(userId, event, data);
    });
  }

  // Broadcast to all connected users
  broadcast(event: string, data: any) {
    this.server.emit(event, data);
  }
}
