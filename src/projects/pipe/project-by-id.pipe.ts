import { PipeTransform, Injectable, ArgumentMetadata, NotFoundException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { Project, ProjectDocument } from '../projects.schema';
import { ProjectsService } from '../projects.service';

@Injectable()
export class ProjectByIdPipe implements PipeTransform<string, Promise<ProjectDocument>> {
    constructor(private readonly projectService: ProjectsService) {}

    async transform(value: string, metadata: ArgumentMetadata): Promise<ProjectDocument> {
        if(!isValidObjectId(value)) {
            throw new NotFoundException('No tool with that id');
        }

        const id = value;
        const project = await this.projectService.getProjectById(id);

        if(!project) {
            throw new NotFoundException('No tool with that id');
        } 

        return project;
    }
}