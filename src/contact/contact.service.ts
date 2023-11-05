import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './contact.schema';
import { CreateContactDto } from './create-contact.dto';

@Injectable()
export class ContactService {
    constructor(@InjectModel(Contact.name) private readonly contactModel: Model<Contact>) {}

    async createContact(contactDto: CreateContactDto): Promise<Contact> {
        const contact = new this.contactModel(contactDto);
        await contact.save()
        return contact;
    }

    async getContactById(id: string): Promise<ContactDocument> {
        const contact = await this.contactModel.findById(id).exec();
        if(!contact?.alreadySeen) {
            contact.alreadySeen = true;
            await contact.save();
        }
        return contact;
    }

    async getAllContact(): Promise<Contact[]> {
        return await this.contactModel.find().exec();
    }

    async deleteContact(contact: ContactDocument): Promise<void> {
        await contact.deleteOne();
        return;
    }
}
