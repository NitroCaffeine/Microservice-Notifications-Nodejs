/* eslint-disable prettier/prettier */
import { NotificationsRepository } from "@app/repositories/notifications.repository";
import { Notification } from "@app/entities/notifications";

export class InMemoryNotificationsRepository implements NotificationsRepository {
    async FindManyByRecipientId(recipientId: string): Promise<Notification[]> {
        return this.notificationsArray.filter((notification) => notification.recipientId === recipientId)
    }
 

    
    async countManyByRecipientId(recipientId: string): Promise<number> {
       return this.notificationsArray.filter((notification) => notification.recipientId === recipientId).length
    }
    async findById(notificationId: string): Promise<Notification> {
        const notification = this.notificationsArray.find((notification) => notification.id === notificationId)

        if(!notification){
            return null
        }
        return notification
    }
    async update(notification: Notification): Promise<void> {
        const notificationIndex = this.notificationsArray.findIndex((notification) => notification.id === notification.id)

        if (notificationIndex >=0){
            this.notificationsArray[notificationIndex] = notification
        }
    }

    public notificationsArray: Notification[] = [];

    async create(notification: Notification){
       this.notificationsArray.push(notification)
    }
}
