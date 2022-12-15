/* eslint-disable prettier/prettier */
import { makeNotification } from '@test/factories/notifications-factory';
import {unreadNotification } from './unread-notification';
import { NotificationNotFound } from './errors/notification-not-found';

import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications.repository";



describe("cancel notification",()=>{
    it("should be able to cancel a notification", async ()=>{

        const notificationsRepository = new InMemoryNotificationsRepository();
       const unreadNotificationvar = new unreadNotification(notificationsRepository);

       const notification = makeNotification({readAt: new Date()})

       await notificationsRepository.create(notification)

       await unreadNotificationvar.execute( {notificationtId: notification.id})

    
       expect(notificationsRepository.notificationsArray[0].readAt).toBeNull();
    })


    it (" should not be able to cancel a notification that does not exist", async ()=>{
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotificationvar = new unreadNotification(notificationsRepository);

        await expect(()=>{unreadNotificationvar.execute({notificationtId: "fake-noti-id"})}).rejects.toThrow(NotificationNotFound);
    })
})