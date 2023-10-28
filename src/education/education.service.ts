import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Education, EducationDocument } from './education.schema';
import { Model } from 'mongoose';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
    constructor(@InjectModel(Education.name) private readonly educationModel: Model<Education>) {}

    async createEducation(educationDto: CreateEducationDto): Promise<Education> {
        if(parseInt(educationDto.to) < parseInt(educationDto.from)) {
            throw new BadRequestException("To must be greater than From");
        }
        const education = new this.educationModel(educationDto);
        await education.save()
        return education;
    }

    async getEducationById(id: string): Promise<EducationDocument> {
        return await this.educationModel.findById(id).exec();
    }

    async getAllEducation(): Promise<Education[]> {
        return await this.educationModel.find().exec();
    }

    async updateEducation(education: EducationDocument, educationDto: UpdateEducationDto): Promise<Education> {
        educationDto.title && (education.title = educationDto.title);
        educationDto.description && (education.description = educationDto.description);
        educationDto.location && (education.title = educationDto.location);
        educationDto.from && (education.from = educationDto.from);
        educationDto.to && (education.to = educationDto.to);
        educationDto.inProgress && (education.inProgress = educationDto.inProgress);

        if(parseInt(education.to.toString()) < parseInt(education.from.toString())) {
            throw new BadRequestException("To must be greater than From");
        }

        await education.save();

        return education;
    }

    async deleteEducation(education: EducationDocument): Promise<void> {
        await education.deleteOne();
        return;
    }
}
