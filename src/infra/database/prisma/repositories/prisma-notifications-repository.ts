/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notifications';
import { NotificationsRepository } from '@app/repositories/notifications.repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}


  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notifications.count({
      where: {
        recipientId,
      }
    });

    return count
  }

  async FindManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notifications.findMany({
      where: {
        recipientId,
      }
    });

    return notifications.map(PrismaNotificationMapper.toDomain)
  }

  async update(notification: Notification): Promise<void> {
    const prismaNotification = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notifications.update({
      where: {
        id: notification.id,
      },
      data: prismaNotification,
    });
  }


  async findById(notificationId: string): Promise<Notification | null> {
     const notication = await this.prismaService.notifications.findUnique({
      where:{
        id: notificationId
      }
     });

     if(!notication){
       return null
     }

     return PrismaNotificationMapper.toDomain(notication)
  }



  async create(notification: Notification): Promise<void> {
    const prismaNotification = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notifications.create({
      data: prismaNotification,
    });
  }
}
