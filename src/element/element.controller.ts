import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { ProjectService } from '../project/project.service';

@Controller('element')
export class ElementController {
  constructor(
    private readonly elementService: ElementService,
    private readonly projectService: ProjectService,
  ) {}

  @Get()
  async findAll() {
    const elements = await this.elementService.findAll();

    return { data: { elements } };
  }

  @Get('project/:projectId')
  async findAllByProject(@Param('projectId') projectId: number) {
    const elements = await this.elementService.findAll(projectId);

    await this.projectService.assertExists(projectId);

    return { data: { elements } };
  }

  @Post()
  async create(@Body() createElementDto: CreateElementDto) {
    const { projectId } = createElementDto;

    this.projectService.assertExists(projectId);

    const element = await this.elementService.create(createElementDto);

    return { message: 'Element created', data: { element } };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const element = await this.elementService.findOne(id);

    this.elementService.assertExists(id);

    return { data: { element } };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateElementDto: UpdateElementDto,
  ) {
    this.elementService.assertExists(id);

    const updatedElement = await this.elementService.update(
      id,
      updateElementDto,
    );

    return { message: 'Element updated', data: { element: updatedElement } };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<object> {
    this.elementService.assertExists(id);

    await this.elementService.remove(id);

    return { message: 'Element deleted' };
  }
}
