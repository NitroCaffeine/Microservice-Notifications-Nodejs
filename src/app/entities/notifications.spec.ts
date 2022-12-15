/* eslint-disable prettier/prettier */
import { Content } from './content';
import { Notification } from './notifications';

describe('notifications', () => {
  it('It should be able to create a notification', () => {
    const notification = new Notification({
        content: new Content("nova solicitação de amizade"),
        category: "social",
        recipientId: "ksdsdfe"
    });
    expect(notification).toBeTruthy();
  });
});
