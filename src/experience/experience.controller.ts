import { Controller, Post, Put, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Experience, ExperienceDocument } from './experience.schema';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { AuthGuard } from 'src/auth/auth.gard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateExperiencDto } from './dto/update-experience.dto';
import { ExperienceByIdPipe } from './experience-by-id.pipe';

@ApiTags('Experience')
@Controller('experience')
export class ExperienceController {
    constructor(private readonly experienceService: ExperienceService) {}

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: CreateExperienceDto })
    @ApiResponse({ status: 201, description: 'The experience has been successfully created.', type: Experience })
    async createExperience(@Body() experienceDto: CreateExperienceDto): Promise<Experience> {
        const newExperience = this.experienceService.createExperience(experienceDto);
        return newExperience;
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: UpdateExperiencDto })
    @ApiParam({ name: 'id', description: 'ID of the experience', type: String })
    @ApiResponse({ status: 200, description: 'The experience has been successfully updated.', type: Experience })
    async updateExperience(
        @Param('id', ExperienceByIdPipe) experience: ExperienceDocument, 
        @Body() experienceDto: UpdateExperiencDto
    ): Promise<Experience> {
        const updatedExperience = await this.experienceService.updateExperience(experience, experienceDto);
        return updatedExperience;
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'ID of the experience', type: String })
    @ApiResponse({ status: 200, description: 'The experience has been successfully retrieved.', type: Experience })
    async getExperience(@Param('id', ExperienceByIdPipe) experience: ExperienceDocument): Promise<Experience> {
        return experience;
    }

    @Get()
    @ApiResponse({ status: 200, description: 'All experiences have been successfully retrieved.', type: [Experience] })
    async getAllExperience(): Promise<Experience[]> {
        const experiences = await this.experienceService.getAllExperience(); 
        return experiences;
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the experience', type: String })
    @ApiResponse({ status: 200, description: 'The experience has been successfully deleted.' })
    async deleteExperience(@Param('id', ExperienceByIdPipe) experience: ExperienceDocument) {
        await this.experienceService.deleteExperience(experience);
        return;
    }
}