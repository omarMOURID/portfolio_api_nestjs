import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Education, EducationSchema } from './education.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Education.name, schema: EducationSchema}])],
  controllers: [EducationController],
  providers: [EducationService]
})
export class EducationModule {}
