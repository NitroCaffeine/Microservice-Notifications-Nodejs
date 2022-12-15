/* eslint-disable prettier/prettier */
import { NotificationNotFound } from './errors/notification-not-found';

import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications.repository";

interface CountRecipientNotificationsRequest{
    recipientId: string;
   
}

interface CountRecipientNotificationsResponse {
    count: number;
}
    


@Injectable()
export class CountRecipientNotifications{
    constructor(  private notificationsRepository: NotificationsRepository){
      
    } 


    async execute(request: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse>{
        const {recipientId} = request;
        
        const count = await this.notificationsRepository.countManyByRecipientId(recipientId);

        // if(count < 0){
        //     throw new NotificationNotFound()
        // }


        return{count}
    }
}