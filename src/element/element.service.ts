import { Element, ElementType } from './entities/element.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ElementService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
  ) {}

  async findAll(projectId?: number): Promise<Element[]> {
    return await this.elementRepository.find({
      where: projectId !== undefined ? { projectId } : {},
    });
  }

  async findOne(id: number): Promise<Element> {
    return await this.elementRepository.findOne({
      where: { id },
    });
  }

  async create({
    name,
    projectId,
    type,
  }: {
    name: string;
    projectId: number;
    type: ElementType;
  }): Promise<Element> {
    return await this.elementRepository.save({ name, projectId, type });
  }

  async update(
    id: number,
    {
      name,
      type,
    }: {
      name: string;
      type: ElementType;
    },
  ): Promise<Element> {
    const project = await this.elementRepository.findOneBy({ id });
    project.name = name;
    project.type = type;
    return await this.elementRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    await this.elementRepository.delete(id);
  }

  async assertExists(id: number): Promise<void> {
    const element = await this.elementRepository.findOneBy({ id });
    if (!element) {
      throw new HttpException('Element not found', HttpStatus.NOT_FOUND);
    }
  }
}
