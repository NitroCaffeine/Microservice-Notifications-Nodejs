/* eslint-disable prettier/prettier */
import { Content } from './content';

describe('notifications content', () => {
  it('It should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma soliciação de amizade');
    expect(content.value).toBeTruthy();
  });

  it('not be able to create a content of notification less than five characters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  it('It should be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('aaa'.repeat(241))).toBeTruthy();
  });
});
