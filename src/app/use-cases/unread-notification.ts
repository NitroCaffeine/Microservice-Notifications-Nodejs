import { NotificationNotFound } from './errors/notification-not-found';
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications.repository";

interface unreadNotificationRequest{
    notificationtId: string;
   
}

type unreadNotificationResponse = void
    


@Injectable()
export class unreadNotification{
    constructor(  private notificationsRepository: NotificationsRepository){
      
    } 


    async execute(request: unreadNotificationRequest): Promise<unreadNotificationResponse>{
        const {notificationtId} = request;
        
        const notification = await this.notificationsRepository.findById(notificationtId);

        if(!notification){
            throw new NotificationNotFound()
        }

        notification.unread();

        await this.notificationsRepository.update(notification);
    }
}