/* eslint-disable prettier/prettier */
import {Notifications as PrismaNotification} from "@prisma/client"
import { Notification } from '@app/entities/notifications';
import { Content } from "@app/entities/content";

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: PrismaNotification): Notification {
    return new Notification({
      // id: raw.id,
      content: new Content(raw.content),
      category: raw.category,
      recipientId: raw.recipientId,
      readAt: raw.readAt,
      createdAt: raw.createdAt,
    }, raw.id);
  }
}
