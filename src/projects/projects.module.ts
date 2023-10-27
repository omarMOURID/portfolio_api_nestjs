import { Module, BadRequestException } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './projects.schema';
import { ToolsModule } from 'src/tools/tools.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/posix';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}]),
    MulterModule.register({
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
            const uniqueSuffix = "project" + Date.now() + "-" + Math.round(Math.random()*1e9);
            const ext = extname(file.originalname);
            const filename = `${uniqueSuffix}${ext}`;
            req.body.image = filename;
            callback(null, filename);
        }
      }),
      fileFilter: (req, file, callback) => {
        const ext = extname(file.originalname).substring(1);

        if(ext !== "png" && ext !== "jpg" && ext !== "jpeg") {
          return callback(new BadRequestException("Extension not allowed, only [png, jpg, jpeg]"), false);
        }
        return callback(null, true);
      }
    }),
    ToolsModule,
],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
