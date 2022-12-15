/* eslint-disable prettier/prettier */
import { Notification } from 'src/app/entities/notifications';
export class NotificationNotFound extends Error {
  constructor() {
    super('Notification not found');
  }
}
