import { PipeTransform, Injectable, ArgumentMetadata, NotFoundException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { ContactDocument } from './contact.schema';
import { ContactService } from './contact.service';

@Injectable()
export class ContactByIdPipe implements PipeTransform<string, Promise<ContactDocument>> {
    constructor(private readonly contactService: ContactService) {}

    async transform(value: string, metadata: ArgumentMetadata): Promise<ContactDocument> {
        if(!isValidObjectId(value)) {
            throw new NotFoundException('No Contact with that id');
        }

        const id = value;
        const contact = await this.contactService.getContactById(id);

        if(!contact) {
            throw new NotFoundException('No Contact with that id');
        } 

        return contact;
    }
}