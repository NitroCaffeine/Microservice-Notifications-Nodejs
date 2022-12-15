/* eslint-disable prettier/prettier */
import { makeNotification } from '@test/factories/notifications-factory';
import { readNotification } from './read-notifications';
import { NotificationNotFound } from './errors/notification-not-found';

import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications.repository";



describe("cancel notification",()=>{
    it("should be able to cancel a notification", async ()=>{

        const notificationsRepository = new InMemoryNotificationsRepository();
       const readNotificationvar = new readNotification(notificationsRepository);

       const notification = makeNotification()

       await notificationsRepository.create(notification)

       await readNotificationvar.execute( {notificationtId: notification.id})

    
       expect(notificationsRepository.notificationsArray[0].readAt).toEqual(expect.any(Date));
    })


    it (" should not be able to cancel a notification that does not exist", async ()=>{
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotificationvar = new readNotification(notificationsRepository);

        await expect(()=>{readNotificationvar.execute({notificationtId: "fake-noti-id"})}).rejects.toThrow(NotificationNotFound);
    })
})