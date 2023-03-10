/* eslint-disable prettier/prettier */
import { NotificationsRepository } from 'src/app/repositories/notifications.repository';
import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';

@Module({
  providers: [PrismaService,{
    provide: NotificationsRepository,
    useClass: PrismaNotificationsRepository,
  }],
  exports: [PrismaService, NotificationsRepository]
})
export class DatabaseModule {}
