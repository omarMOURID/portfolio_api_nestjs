import { Controller, Sse } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from './notification.service';


interface MessageEvent {
    data: string | object;
}

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Sse('sse')
    sse(): Observable<any> {
        return this.notificationService.sendEvents();
    }
}
