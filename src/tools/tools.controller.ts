import { Controller, Get, Post, UseInterceptors, UseGuards, Body, Param, Delete } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { Tool, ToolDocument } from './tools.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateToolDbDto } from './dto/create-tool-db.dto';
import { ToolByIdPipe } from './pipe/tool-by-id.pipe';
import { AuthGuard } from 'src/auth/auth.gard';

@Controller('tools')
export class ToolsController {
    constructor(private readonly toolService: ToolsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async addTool(@Body() createToolDto: CreateToolDbDto): Promise<Tool> {
        const newTool = await this.toolService.create(createToolDto)
        return newTool;
    }

    @Get(":id")
    async getTool(@Param("id", ToolByIdPipe) tool: Tool): Promise<Tool> {
        return tool;
    }

    @Get()
    async getAllTools(): Promise<Tool[]> {
        const allTools = await this.toolService.findAll();
        return allTools;
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    async deleteTool(@Param("id", ToolByIdPipe) tool: ToolDocument) {
        await this.toolService.deleteOne(tool);
        return;
    }
}
