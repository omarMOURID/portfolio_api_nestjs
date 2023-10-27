import { Controller, Get, Post, Put, Delete, UseInterceptors, Body, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project, ProjectDocument, ProjectSchema } from './projects.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectByIdPipe } from './pipe/project-by-id.pipe';
import { AuthGuard } from 'src/auth/auth.gard';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add a new project', description: 'Create a new project with the provided data.' })
    @ApiResponse({ status: 201, description: 'The project has been successfully created.', type: Project })
    async addProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        const newProject = await this.projectsService.createProject(createProjectDto);
        return newProject;
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth()
    @ApiParam({name: "id", description: 'The ID of the project', type: String })
    @ApiOperation({ summary: 'Update a project', description: 'Update an existing project with the provided data.' })
    @ApiResponse({ status: 200, description: 'The project has been successfully updated.', type: Project })
    async updateProject(@Param("id", ProjectByIdPipe) project: ProjectDocument, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
        const updatedProject = await this.projectsService.updateProject(project, updateProjectDto);
        return updatedProject;
    }

    @Get()
    @ApiOperation({ summary: 'Get all active projects', description: 'Retrieve a list of all active projects.' })
    @ApiResponse({ status: 200, description: 'Returns a list of all active projects.', type: [Project] })
    async getActiveProjects(): Promise<Project[]> {
        const allActiveProjects = await this.projectsService.getAtiveProjects();
        return allActiveProjects;
    }

    @Get("all")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all projects', description: 'Retrieve a list of all projects.' })
    @ApiResponse({ status: 200, description: 'Returns a list of all projects.', type: [Project] })
    async getAllProjects(): Promise<Project[]> {
        const allProjects = await this.projectsService.getAllProjects();
        return allProjects;
    }

    @Get(":id")
    @ApiParam({name: "id", description: 'The ID of the project', type: String })
    @ApiOperation({ summary: 'Get a project by ID', description: 'Retrieve a specific project based on the provided ID.' })
    @ApiResponse({ status: 200, description: 'Returns the project based on the provided ID.', type: Project })
    async getProduct(@Param("id", ProjectByIdPipe) project: ProjectDocument,): Promise<Project> {
        return project;
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiParam({name: "id", description: 'The ID of the project', type: String })
    @ApiOperation({ summary: 'Delete a project by ID', description: 'Delete a specific project based on the provided ID.' })
    @ApiResponse({ status: 200, description: 'The project has been successfully deleted.' })
    async deleteProject(@Param("id", ProjectByIdPipe) project: ProjectDocument) {
        await this.projectsService.deleteProject(project)
        return;
    }
}
