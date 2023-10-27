import { Module, BadRequestException } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MulterModule.register({
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
            const uniqueSuffix = "user" + Date.now() + "-" + Math.round(Math.random()*1e9);
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
    })],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
