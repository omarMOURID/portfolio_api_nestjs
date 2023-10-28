import { Body, Param, Controller, Post, Get, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Education, EducationDocument } from './education.schema';
import { CreateEducationDto } from './dto/create-education.dto';
import { AuthGuard } from 'src/auth/auth.gard';
import { EducationService } from './education.service';
import { EducationByIdPipe } from './education-by-id.pipe';
import { UpdateEducationDto } from './dto/update-education.dto';

@Controller('education')
@ApiTags('Educations')
export class EducationController {
    constructor(private readonly educationService: EducationService) {}

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: CreateEducationDto })
    @ApiResponse({ status: 201, description: 'The education has been successfully created.' })
    async addEducation(@Body() educationDto: CreateEducationDto): Promise<Education> {
        const newEducation = await this.educationService.createEducation(educationDto);
        return newEducation;
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'The education has been successfully updated.' })
    async updateEducation(
        @Param('id', EducationByIdPipe) education: EducationDocument,
        @Body() educationDto: UpdateEducationDto
    ): Promise<Education> {
        const updatedEducation = await this.educationService.updateEducation(education, educationDto);
        return updatedEducation;
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'The education has been successfully retrieved.' })
    async getEducation(@Param('id', EducationByIdPipe) education: EducationDocument): Promise<Education> {
        return education;
    }

    @Get()
    @ApiResponse({ status: 200, description: 'All education records have been successfully retrieved.' })
    async getAllEducation(): Promise<Education[]> {
        const allEducation = await this.educationService.getAllEducation();
        return allEducation;
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'The education has been successfully deleted.' })
    async deleteEducation(@Param('id', EducationByIdPipe) education: EducationDocument): Promise<void> {
        await this.educationService.deleteEducation(education);
        return;
    }
}
