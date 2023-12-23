import { Controller, Get, Sse } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { NotificationService } from './notification.service';
import { Notification } from './notification.schema';


interface MessageEvent {
    data: string | object;
}

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Sse('sse')
    sse(): Observable<Notification> {
        return this.notificationService.sendEvents();
    }

    @Get('')
    async getNotifications(): Promise<Notification[]> {
        return this.notificationService.getALLNotification();
    }
}
