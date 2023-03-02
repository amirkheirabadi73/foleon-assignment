import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectSeedService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async run() {
    const countProject = await this.projectRepository.count();

    if (countProject === 0) {
      await this.projectRepository.save(
        this.projectRepository.create({
          id: 1,
          name: 'Sample Project',
        }),
      );
    }
  }
}
