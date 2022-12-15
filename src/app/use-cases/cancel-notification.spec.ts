import { NotificationNotFound } from './errors/notification-not-found';
/* eslint-disable prettier/prettier */
import { Content } from "@app/entities/content";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications.repository";
import { Notification } from "../entities/notifications";
import { CancelNotification } from "./cancel-notification";
import { SendNotification } from "./Send-notification";



describe("cancel notification",()=>{
    it("should be able to cancel a notification", async ()=>{

        const notificationsRepository = new InMemoryNotificationsRepository();
       const cancelNotification = new CancelNotification(notificationsRepository);

       const notification = new Notification({
        category: "social",
        content: new Content("conteúdo da notificação"),
        recipientId: "ksdsdfe"
       })

       await notificationsRepository.create(notification)

       await cancelNotification.execute( {notificationtId: notification.id})

    
       expect(notificationsRepository.notificationsArray[0].canceledAt).toEqual(expect.any(Date));
    })


    it (" should not be able to cancel a notification that does not exist", async ()=>{
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        await expect(()=>{cancelNotification.execute({notificationtId: "fake-noti-id"})}).rejects.toThrow(NotificationNotFound);
    })
})