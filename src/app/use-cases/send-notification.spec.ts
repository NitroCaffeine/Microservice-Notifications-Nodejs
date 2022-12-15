/* eslint-disable prettier/prettier */
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications.repository";
import { Notification } from "../entities/notifications";
import { SendNotification } from "./Send-notification";



describe("send notification",()=>{
    it("should be able to send a notification", async ()=>{

        const notificationsRepository = new InMemoryNotificationsRepository();
       const sendNotification = new SendNotification(notificationsRepository);

        const {notification }= await sendNotification.execute({
        content: "conteúdo da notificação",
        category: "social",
        recipientId: "ksdsdfe"
       })

       expect(notificationsRepository.notificationsArray).toHaveLength(1);
       expect(notificationsRepository.notificationsArray[0]).toEqual(notification);
    })
})