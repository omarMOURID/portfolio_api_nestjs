import { PipeTransform, Injectable, ArgumentMetadata, NotFoundException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { ExperienceDocument } from './experience.schema';
import { ExperienceService } from './experience.service';

@Injectable()
export class ExperienceByIdPipe implements PipeTransform<string, Promise<ExperienceDocument>> {
    constructor(private readonly experienceService: ExperienceService) {}

    async transform(value: string, metadata: ArgumentMetadata): Promise<ExperienceDocument> {
        if(!isValidObjectId(value)) {
            throw new NotFoundException('No Experience with that id');
        }

        const id = value;
        const experience = await this.experienceService.getExperienceById(id);

        if(!experience) {
            throw new NotFoundException('No Experience with that id');
        } 

        return experience;
    }
}