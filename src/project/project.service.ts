import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    return await this.projectRepository.findOne({
      where: { id },
      relations: { documents: true },
    });
  }

  async create({ name }: { name: string }): Promise<Project> {
    return await this.projectRepository.save({ name });
  }

  async update(id: number, { name }: { name: string }): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id });
    project.name = name;
    return await this.projectRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async assertExists(id: number): Promise<void> {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
  }
}
