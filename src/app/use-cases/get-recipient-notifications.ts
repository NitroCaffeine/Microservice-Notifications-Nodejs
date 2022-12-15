import { Notification } from '@app/entities/notifications';
/* eslint-disable prettier/prettier */
import { NotificationNotFound } from './errors/notification-not-found';

import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications.repository";

interface getRecipientNotificationsRequest{
    recipientId: string;
   
}

interface getRecipientNotificationsResponse {
    notifications: Notification[];
}
    


@Injectable()
export class getRecipientNotifications{
    constructor(  private notificationsRepository: NotificationsRepository){
      
    } 


    async execute(request: getRecipientNotificationsRequest): Promise<getRecipientNotificationsResponse>{
        const {recipientId} = request;
        
        const notifications = await this.notificationsRepository.FindManyByRecipientId(recipientId);


        return {notifications}
    }
}