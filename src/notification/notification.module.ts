import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ContactModule } from 'src/contact/contact.module';
import { NotificationController } from './notification.controller';

@Module({
  imports: [ContactModule],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
