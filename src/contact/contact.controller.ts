import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './create-contact.dto';
import { ContactByIdPipe } from './contact-by-id.pipe';
import { Contact, ContactDocument } from './contact.schema';
import { AuthGuard } from 'src/auth/auth.gard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Contact')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Post()
    @ApiBody({ type: CreateContactDto })
    @ApiResponse({ status: 201, description: 'The contact has been successfully created.' })
    async createContact(@Body() contactDto: CreateContactDto): Promise<void> {
        const contact = await this.contactService.createContact(contactDto);
        return;
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the contact', type: String })
    @ApiResponse({ status: 200, description: 'The contact has been successfully retrieved.', type: Contact })
    async getContact(@Param('id', ContactByIdPipe) contact: ContactDocument): Promise<Contact> {
        return contact;
    }

    @Get()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'All contacts have been successfully retrieved.', type: [Contact] })
    async getAllContact(): Promise<Contact[]> {
        const allContact = await this.contactService.getAllContact();
        return allContact;
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the contact', type: String })
    @ApiResponse({ status: 200, description: 'The contact has been successfully deleted.' })
    async deleteContact(@Param('id', ContactByIdPipe) contact: ContactDocument): Promise<void> {
        await this.deleteContact(contact);
        return;
    }
}