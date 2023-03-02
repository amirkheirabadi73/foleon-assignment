import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { ProjectSeedService } from './project-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectSeedService],
  exports: [ProjectSeedService],
})
export class ProjectSeedModule {}
