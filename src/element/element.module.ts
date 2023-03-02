import { Element } from './entities/element.entity';
import { ElementController } from './element.controller';
import { ElementService } from './element.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/entities/project.entity';

@Module({
  controllers: [ElementController],
  imports: [TypeOrmModule.forFeature([Element, Project])],
  providers: [ElementService, ProjectService],
})
export class ElementModule {}
