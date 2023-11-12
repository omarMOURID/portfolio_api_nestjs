import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolsModule } from './tools/tools.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { EducationModule } from './education/education.module';
import { ExperienceModule } from './experience/experience.module';
import { ContactModule } from './contact/contact.module';
import { NotificationModule } from './notification/notification.module';
import { EventEmitterModule } from '@nestjs/event-emitter';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.bxgfqkv.mongodb.net`, {dbName: "portfolio"}), 
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      global: true
    }),
    ProjectsModule, 
    ToolsModule, AuthModule, UserModule, EducationModule, ExperienceModule, ContactModule, NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
