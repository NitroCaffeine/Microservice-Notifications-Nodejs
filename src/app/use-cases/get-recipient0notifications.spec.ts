import { getRecipientNotifications } from './get-recipient-notifications';
/* eslint-disable prettier/prettier */
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { makeNotification } from '@test/factories/notifications-factory';

describe('get recipient notifications', () => {
  it('should be able to get the notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotificationsArray = new getRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    const { notifications } = await getRecipientNotificationsArray.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
