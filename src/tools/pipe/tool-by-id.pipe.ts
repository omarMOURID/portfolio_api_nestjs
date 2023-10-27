import { PipeTransform, Injectable, ArgumentMetadata, NotFoundException } from '@nestjs/common';
import { Tool } from '../tools.schema';
import { ToolsService } from '../tools.service';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ToolByIdPipe implements PipeTransform<string, Promise<Tool>> {
    constructor(private readonly toolsService: ToolsService) {}

    async transform(value: string, metadata: ArgumentMetadata): Promise<Tool> {
        if(!isValidObjectId(value)) {
            throw new NotFoundException('No tool with that id');
        }

        const id = value;
        const tool = await this.toolsService.findOne(id);

        if(!tool) {
            throw new NotFoundException('No tool with that id');
        } 

        return tool;
    }
}