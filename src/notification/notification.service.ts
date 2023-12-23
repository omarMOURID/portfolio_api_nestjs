import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Observable, Subject } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './notification.schema';

@Injectable()
export class NotificationService {
    private events: Subject<Notification> = new Subject();

    constructor(@InjectModel(Notification.name) private readonly notificationModel: Model<Notification>) {}

    @OnEvent('contact.create')
    async handleCreateContactEvent(payload) {
        const notification = new this.notificationModel({
            dataId: payload.contact._id,
            description: `You got new message from ${payload.contact.email}`
        });
        await notification.save();
        this.events.next(notification.toJSON());
    }

    sendEvents(): Observable<Notification> {
        return this.events.asObservable();
    }

    async getALLNotification(): Promise<Notification[]> {
        return this.notificationModel.find().exec();
    }
}
