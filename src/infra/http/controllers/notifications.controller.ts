import { getRecipientNotifications } from './../../../app/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from './../../../app/use-cases/count-recipient-notifications';
import { unreadNotification } from './../../../app/use-cases/unread-notification';
import { readNotification } from './../../../app/use-cases/read-notifications';
import { CancelNotification } from './../../../app/use-cases/cancel-notification';
/* eslint-disable prettier/prettier */
import { NotificationViewModel } from './../view-models/notification-view-model';
import { SendNotification } from '@app/use-cases/Send-notification';
import { CreateNotificationBody } from '../dtos/create-notifications-body';
import { PrismaService } from '../../database/prisma/prisma.service';
import { Controller, Post, Patch, Param, Body, Get } from '@nestjs/common';
import { randomUUID } from 'node:crypto';


@Controller('notifications') // define as rotas da aplicação adicionando o decorator @Controller()
export class NotificationsController {
  //quem, instancia a classe informa as depedências dela

  constructor(private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotifications: readNotification,
    private unreadNotifications: unreadNotification,
    private CountRecipientNotification: CountRecipientNotifications,
    private getRecipientNotification: getRecipientNotifications) {}


  @Patch(':id/cancel')
  async cancel(@Param('id') id:string){

    await this.cancelNotification.execute({
      notificationtId: id
    })

  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('irecipientId') recipientId:string): Promise<{count:number}>{
    const { count } = await this.CountRecipientNotification.execute({recipientId})

    return{ count}

  }


  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId:string){
    const {notifications} = await this.getRecipientNotification.execute({recipientId})

    return{
      notifications: notifications.map(NotificationViewModel.toHTTP)
    }

  }


  @Patch(':id/read')
  async read(@Param('id') id:string){
    await this.readNotifications.execute({
      notificationtId: id
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id:string){
    await this.unreadNotifications.execute({
      notificationtId: id
    })
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
