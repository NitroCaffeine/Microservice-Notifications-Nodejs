import { NotificationNotFound } from './errors/notification-not-found';
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications.repository";

interface CancelNotificationRequest{
    notificationtId: string;
   
}

type CancelNotificationResponse = void
    


@Injectable()
export class CancelNotification{
    constructor(  private notificationsRepository: NotificationsRepository){
      
    } 


    async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse>{
        const {notificationtId} = request;
        
        const notification = await this.notificationsRepository.findById(notificationtId);

        if(!notification){
            throw new NotificationNotFound()
        }

        notification.cancel();

        await this.notificationsRepository.update(notification);
    }
}