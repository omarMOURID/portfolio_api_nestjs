import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ContactModule } from 'src/contact/contact.module';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './notification.schema';

@Module({
  imports: [ContactModule, MongooseModule.forFeature([{name: Notification.name, schema: NotificationSchema}])],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
