import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationsGateway } from './notifications.gateway';

export interface NotificationPayload {
  id?: number;
  type: 'EXPRESSION_SUBMITTED' | 'EXPRESSION_STATUS_CHANGED' | 'NEW_MESSAGE' | 'EXPRESSION_VALIDATED' | 'EXPRESSION_REFUSED';
  title: string;
  message: string;
  expressionId?: number;
  expressionTitre?: string;
  fromUserId?: number;
  fromUserName?: string;
  createdAt: Date;
  read: boolean;
}

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private gateway: NotificationsGateway,
  ) {}

  // Notify when an expression is submitted (status changes to EN_ATTENTE)
  async notifyExpressionSubmitted(expressionId: number, expressionTitre: string, creatorId: number, creatorName: string) {
    // Get all validators (users with VALIDATEUR role) and admins
    const validators = await this.prisma.user.findMany({
      where: {
        OR: [
          { role: 'VALIDATEUR' },
          { role: 'ADMIN' },
        ],
        actif: true,
      },
      select: { id: true },
    });

    const notification: NotificationPayload = {
      type: 'EXPRESSION_SUBMITTED',
      title: 'Nouvelle expression soumise',
      message: `${creatorName} a soumis l'expression "${expressionTitre}"`,
      expressionId,
      expressionTitre,
      fromUserId: creatorId,
      fromUserName: creatorName,
      createdAt: new Date(),
      read: false,
    };

    // Save notifications to database
    const savedNotifications = await Promise.all(
      validators.map(async (validator) => {
        return this.prisma.notification.create({
          data: {
            type: notification.type,
            title: notification.title,
            message: notification.message,
            expressionId,
            fromUserId: creatorId,
            userId: validator.id,
          },
        });
      })
    );

    // Send real-time notifications
    validators.forEach((validator, index) => {
      this.gateway.sendToUser(validator.id, 'notification', {
        ...notification,
        id: savedNotifications[index].id,
      });
    });

    return savedNotifications;
  }

  // Notify when expression status changes
  async notifyExpressionStatusChanged(
    expressionId: number,
    expressionTitre: string,
    newStatus: string,
    creatorId: number,
    changedByUserId: number,
    changedByUserName: string,
  ) {
    const statusLabels: Record<string, string> = {
      BROUILLON: 'Brouillon',
      EN_ATTENTE: 'En attente de validation',
      VALIDE: 'Validée',
      REFUSE: 'Refusée',
      PRIS_EN_CHARGE: 'Prise en charge',
    };

    const notificationType = newStatus === 'VALIDE' ? 'EXPRESSION_VALIDATED' : 
                            newStatus === 'REFUSE' ? 'EXPRESSION_REFUSED' : 
                            'EXPRESSION_STATUS_CHANGED';

    const notification: NotificationPayload = {
      type: notificationType,
      title: `Expression ${statusLabels[newStatus] || newStatus}`,
      message: `L'expression "${expressionTitre}" est maintenant ${statusLabels[newStatus] || newStatus}`,
      expressionId,
      expressionTitre,
      fromUserId: changedByUserId,
      fromUserName: changedByUserName,
      createdAt: new Date(),
      read: false,
    };

    // Notify the creator
    const savedNotification = await this.prisma.notification.create({
      data: {
        type: notification.type,
        title: notification.title,
        message: notification.message,
        expressionId,
        fromUserId: changedByUserId,
        userId: creatorId,
      },
    });

    this.gateway.sendToUser(creatorId, 'notification', {
      ...notification,
      id: savedNotification.id,
    });

    return savedNotification;
  }

  // Notify when a new message is sent in a discussion
  async notifyNewMessage(
    expressionId: number,
    expressionTitre: string,
    messageContent: string,
    senderId: number,
    senderName: string,
  ) {
    // Get all participants in the discussion (creator + validators who have interacted)
    const expression = await this.prisma.expressionDeBesoin.findUnique({
      where: { id: expressionId },
      select: {
        createurId: true,
        discussions: {
          select: {
            auteurId: true,
          },
        },
      },
    });

    if (!expression) return;

    // Get unique user IDs from discussion participants
    const participantIds = new Set<number>();
    participantIds.add(expression.createurId);
    expression.discussions.forEach(msg => participantIds.add(msg.auteurId));
    
    // Remove the sender from recipients
    participantIds.delete(senderId);

    const notification: NotificationPayload = {
      type: 'NEW_MESSAGE',
      title: 'Nouveau message',
      message: `${senderName}: ${messageContent.substring(0, 50)}${messageContent.length > 50 ? '...' : ''}`,
      expressionId,
      expressionTitre,
      fromUserId: senderId,
      fromUserName: senderName,
      createdAt: new Date(),
      read: false,
    };

    // Save and send notifications to all participants
    const savedNotifications = await Promise.all(
      Array.from(participantIds).map(async (userId) => {
        const saved = await this.prisma.notification.create({
          data: {
            type: notification.type,
            title: notification.title,
            message: notification.message,
            expressionId,
            fromUserId: senderId,
            userId,
          },
        });

        this.gateway.sendToUser(userId, 'notification', {
          ...notification,
          id: saved.id,
        });

        return saved;
      })
    );

    // Also emit to the expression room for real-time chat updates
    this.gateway.sendToExpression(expressionId, 'new-message', {
      expressionId,
      senderId,
      senderName,
      message: messageContent,
      createdAt: new Date(),
    });

    return savedNotifications;
  }

  // Get user's notifications
  async getUserNotifications(userId: number, limit = 20) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        expression: {
          select: {
            id: true,
            titre: true,
          },
        },
        fromUser: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            photo: true,
          },
        },
      },
    });
  }

  // Get unread count
  async getUnreadCount(userId: number) {
    return this.prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    });
  }

  // Mark notification as read
  async markAsRead(notificationId: number, userId: number) {
    return this.prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId,
      },
      data: { read: true },
    });
  }

  // Mark all as read
  async markAllAsRead(userId: number) {
    return this.prisma.notification.updateMany({
      where: { userId },
      data: { read: true },
    });
  }
}
