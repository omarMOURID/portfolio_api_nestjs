import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Contact } from 'src/contact/contact.schema';
import { Subject, from } from 'rxjs';

@Injectable()
export class NotificationService {
    private events: Subject<any> = new Subject();

    @OnEvent('contact.create')
    handleCreateContactEvent(payload) {
        this.events.next(`new contact ${payload.contact._id}`);
    }

    sendEvents() {
        return this.events.asObservable();
    }
}
