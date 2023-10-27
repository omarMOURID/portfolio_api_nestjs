import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tool, ToolDocument } from './tools.schema';
import { Model } from 'mongoose';
import { CreateToolDbDto } from './dto/create-tool-db.dto';
import { join } from 'path';
import { unlinkSync } from 'fs';

@Injectable()
export class ToolsService {
    constructor(@InjectModel(Tool.name) private readonly ToolModel: Model<Tool>){}

    async create(createToolDto: CreateToolDbDto): Promise<Tool> {
        const createdTool = new this.ToolModel(createToolDto);
        await createdTool.save();
        return createdTool;
    }

    async findAll(): Promise<Tool[]> {
        return await this.ToolModel.find().exec();
    }

    async findOne(id: String): Promise<Tool> {
        return await this.ToolModel.findById(id).exec();
    }

    async deleteOne(tool: ToolDocument) {
        if (tool.image) {
            const path = join(__dirname, '..', '..', 'upload', tool.image.toString());
            unlinkSync(path);
        }
        await tool.deleteOne()
        return ;
    }
}
