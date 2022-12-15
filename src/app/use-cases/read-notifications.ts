import { NotificationNotFound } from './errors/notification-not-found';
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications.repository";

interface readNotificationRequest{
    notificationtId: string;
   
}

type readNotificationResponse = void
    


@Injectable()
export class readNotification{
    constructor(  private notificationsRepository: NotificationsRepository){
      
    } 


    async execute(request: readNotificationRequest): Promise<readNotificationResponse>{
        const {notificationtId} = request;
        
        const notification = await this.notificationsRepository.findById(notificationtId);

        if(!notification){
            throw new NotificationNotFound()
        }

        notification.read();

        await this.notificationsRepository.update(notification);
    }
}