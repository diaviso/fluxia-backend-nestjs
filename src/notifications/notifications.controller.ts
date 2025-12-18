import { Controller, Get, Patch, Param, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';
import type { Request } from 'express';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(@Req() req: Request) {
    const user = req.user as any;
    return this.notificationsService.getUserNotifications(user.id);
  }

  @Get('unread-count')
  async getUnreadCount(@Req() req: Request) {
    const user = req.user as any;
    const count = await this.notificationsService.getUnreadCount(user.id);
    return { count };
  }

  @Patch(':id/read')
  async markAsRead(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as any;
    await this.notificationsService.markAsRead(id, user.id);
    return { success: true };
  }

  @Patch('read-all')
  async markAllAsRead(@Req() req: Request) {
    const user = req.user as any;
    await this.notificationsService.markAllAsRead(user.id);
    return { success: true };
  }
}
