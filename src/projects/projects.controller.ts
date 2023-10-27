import { Controller, Get, Post, Put, Delete, UseInterceptors, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project, ProjectDocument } from './projects.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectByIdPipe } from './pipe/project-by-id.pipe';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async addProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        const newProject = await this.projectsService.createProject(createProjectDto);
        return newProject;
    }

    @Put(":id")
    @UseInterceptors(FileInterceptor('image'))
    async updateProject(@Param("id", ProjectByIdPipe) project: ProjectDocument, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
        const updatedProject = await this.projectsService.updateProject(project, updateProjectDto);
        return updatedProject;
    }

    @Get()
    async getActiveProjects(): Promise<Project[]> {
        const allActiveProjects = await this.projectsService.getAtiveProjects();
        return allActiveProjects;
    }

    @Get("all")
    async getAllProjects(): Promise<Project[]> {
        const allProjects = await this.projectsService.getAllProjects();
        return allProjects;
    }

    @Delete(":id")
    async deleteProject(@Param("id", ProjectByIdPipe) project: ProjectDocument) {
        await this.projectsService.deleteProject(project)
        return;
    }
}
