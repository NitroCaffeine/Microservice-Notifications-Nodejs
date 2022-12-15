/* eslint-disable prettier/prettier */
import {IsUUID, Length , IsNotEmpty } from 'class-validator';
// import { } from 'class-validator/types/decorator/decorators';

export class CreateNotificationBody {
    
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(5,240)
  content: string;

  @IsNotEmpty()
  category: string;
}
