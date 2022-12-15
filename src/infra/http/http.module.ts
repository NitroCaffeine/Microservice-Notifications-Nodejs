/* eslint-disable prettier/prettier */
import { getRecipientNotifications } from './../../app/use-cases/get-recipient-notifications';
import { unreadNotification } from './../../app/use-cases/unread-notification';
import { readNotification } from './../../app/use-cases/read-notifications';
import { CancelNotification } from './../../app/use-cases/cancel-notification';

import { DatabaseModule } from './../database/database.module';

import { NotificationsController } from './controllers/notifications.controller';

import { Module } from "@nestjs/common";
import { SendNotification } from 'src/app/use-cases/Send-notification';
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';


@Module({
    imports: [DatabaseModule],
    controllers: [
        NotificationsController
    ],
    providers: [SendNotification, CancelNotification, readNotification, unreadNotification, CountRecipientNotifications, getRecipientNotifications],
})


export class HttpModule{}