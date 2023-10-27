import { Controller, Get, Post, UseInterceptors, UseGuards, Body, Param, Delete } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { Tool, ToolDocument } from './tools.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateToolDbDto } from './dto/create-tool-db.dto';
import { ToolByIdPipe } from './pipe/tool-by-id.pipe';
import { AuthGuard } from 'src/auth/auth.gard';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('tools')
@ApiTags('Tools/Technologies')
export class ToolsController {
    constructor(private readonly toolService: ToolsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add a new tool', description: 'Create a new tool with the provided data.' })
    @ApiResponse({ status: 201, description: 'The tool has been successfully created.', type: Tool })
    async addTool(@Body() createToolDto: CreateToolDbDto): Promise<Tool> {
        const newTool = await this.toolService.create(createToolDto)
        return newTool;
    }

    @Get(":id")
    @ApiParam({name: "id", description: 'The ID of the project', type: String })
    @ApiOperation({ summary: 'Get a tool by ID', description: 'Retrieve a specific tool based on the provided ID.' })
    @ApiResponse({ status: 200, description: 'Returns the tool based on the provided ID.', type: Tool })
    async getTool(@Param("id", ToolByIdPipe) tool: Tool): Promise<Tool> {
        return tool;
    }

    @Get()
    @ApiOperation({ summary: 'Get all tools', description: 'Retrieve a list of all available tools.' })
    @ApiResponse({ status: 200, description: 'Returns a list of all tools.', type: [Tool] })
    async getAllTools(): Promise<Tool[]> {
        const allTools = await this.toolService.findAll();
        return allTools;
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth()
    @ApiParam({name: "id", description: 'The ID of the tool', type: String })
    @ApiOperation({ summary: 'Delete a tool by ID', description: 'Delete a specific tool based on the provided ID.' })
    @ApiResponse({ status: 200, description: 'The tool has been successfully deleted.' })
    async deleteTool(@Param("id", ToolByIdPipe) tool: ToolDocument) {
        await this.toolService.deleteOne(tool);
        return;
    }
}
