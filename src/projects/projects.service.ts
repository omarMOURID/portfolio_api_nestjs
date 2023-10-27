import { Injectable, NotFoundException } from '@nestjs/common';
import { Project, ProjectDocument } from './projects.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { join } from 'path';
import { unlinkSync } from 'fs';
import { ToolsService } from 'src/tools/tools.service';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name) private readonly projectModel: Model<Project>,
        private readonly toolsService: ToolsService
    ) {}

    async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
        for (const toolId of createProjectDto.tools) {
            const tool = await this.toolsService.findOne(toolId);
            if (!tool) {
                throw new NotFoundException(`Tool with ID ${toolId} not found`);
            }
        }
        const project = new this.projectModel(createProjectDto);
        await project.save();
        return project;
    }

    async updateProject(project: ProjectDocument, updateProjectDto: UpdateProjectDto): Promise<Project> {
        let tools = [];
        updateProjectDto.tools && updateProjectDto.tools.map( async (toolId) => {
            const tool = await this.toolsService.findOne(toolId);
            if (!tool) {
                throw new NotFoundException(`Tool with ID ${toolId} not found`);
            }
            tools = [...tools, tool]
        });
        
        if (updateProjectDto.image) {
            const path = join(__dirname, '..', '..', 'upload', project.image.toString());
            unlinkSync(path);
        }

        updateProjectDto.title && (project.title = updateProjectDto.title)
        updateProjectDto.description && (project.description = updateProjectDto.description)
        updateProjectDto.link && (project.link = updateProjectDto.link)
        updateProjectDto.active && (project.active = updateProjectDto.active)
        updateProjectDto.image && (project.image = updateProjectDto.image)
        updateProjectDto.tools && (project.tools = tools)

        await project.save();
        return project;
    }

    async getProjectById(id: string): Promise<ProjectDocument> {
        return await this.projectModel.findById(id).exec();
    }

    async getAtiveProjects(): Promise<Project[]> {
        return await this.projectModel.find({active: true}).populate({path: "tools"}).exec();
    }

    async getAllProjects(): Promise<Project[]> {
        return await this.projectModel.find().populate({path: "tools"}).exec();
    }

    async deleteProject(project: ProjectDocument) {
        if (project.image) {
            const path = join(__dirname, '..', '..', 'upload', project.image.toString());
            unlinkSync(path);
        }
        await project.deleteOne();
        return;
    }
}
