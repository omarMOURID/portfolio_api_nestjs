import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Experience, ExperienceDocument } from './experience.schema';
import { Model } from 'mongoose';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperiencDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
    constructor(@InjectModel(Experience.name) private readonly experienceModel: Model<Experience>) {}

    async createExperience(experienceDto: CreateExperienceDto): Promise<Experience> {
        const newExperience = new this.experienceModel(experienceDto);
        await newExperience.save();
        return newExperience;
    }

    async updateExperience(experience: ExperienceDocument, experienceDto: UpdateExperiencDto): Promise<Experience> {
        experienceDto.title && (experience.title = experienceDto.title);
        experienceDto.description && (experience.description = experience.description);
        experienceDto.company && (experience.company = experienceDto.company);
        experienceDto.durationInMonths && (experience.durationInMonths = experienceDto.durationInMonths);
        experienceDto.carriedAt && (experience.carriedAt = experienceDto.carriedAt);
        
        await experience.save();

        return experience;
    }

    async getExperienceById(id: string): Promise<ExperienceDocument> {
        const experience = await this.experienceModel.findById(id).exec();
        return experience;
    }

    async getAllExperience(): Promise<Experience[]> {
        const experices = await this.experienceModel.find().exec();
        return experices;
    }

    async deleteExperience(experience: ExperienceDocument): Promise<void> {
        await experience.deleteOne();
        return;
    }
}
