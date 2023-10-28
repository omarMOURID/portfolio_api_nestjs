import { PipeTransform, Injectable, ArgumentMetadata, NotFoundException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { EducationDocument } from './education.schema';
import { EducationService } from './education.service';

@Injectable()
export class EducationByIdPipe implements PipeTransform<string, Promise<EducationDocument>> {
    constructor(private readonly educationService: EducationService) {}

    async transform(value: string, metadata: ArgumentMetadata): Promise<EducationDocument> {
        if(!isValidObjectId(value)) {
            throw new NotFoundException('No Education experience with that id');
        }

        const id = value;
        const education = await this.educationService.getEducationById(id);

        if(!education) {
            throw new NotFoundException('No Education experience with that id');
        } 

        return education;
    }
}