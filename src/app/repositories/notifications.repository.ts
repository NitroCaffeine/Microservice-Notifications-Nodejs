/* eslint-disable prettier/prettier */
import { Notification } from "../entities/notifications";

export abstract class NotificationsRepository{
    abstract create(notification: Notification): Promise<void>
    abstract findById(notificationId: string): Promise<Notification> | null
    abstract update(notification: Notification): Promise<void>
    abstract countManyByRecipientId(recipientId: string): Promise<number>
    abstract FindManyByRecipientId(recipientId: string): Promise<Notification[]>
}