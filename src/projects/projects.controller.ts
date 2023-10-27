import { Controller, Get, Post, Put, Delete, UseInterceptors, Body, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project, ProjectDocument } from './projects.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectByIdPipe } from './pipe/project-by-id.pipe';
import { AuthGuard } from 'src/auth/auth.gard';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async addProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        const newProject = await this.projectsService.createProject(createProjectDto);
        return newProject;
    }

    @Put(":id")
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
    async getAllProjects(): Promise<Project[]> {
        const allProjects = await this.projectsService.getAllProjects();
        return allProjects;
    }

    @Get(":id")
    async getProduct(@Param("id", ProjectByIdPipe) project: ProjectDocument,): Promise<Project> {
        return project;
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteProject(@Param("id", ProjectByIdPipe) project: ProjectDocument) {
        await this.projectsService.deleteProject(project)
        return;
    }
}
