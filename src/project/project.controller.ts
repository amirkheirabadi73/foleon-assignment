import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll() {
    const projects = await this.projectService.findAll();

    return { data: { projects } };
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectService.create(createProjectDto);

    return { message: 'Project created', data: { project } };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const project = await this.projectService.findOne(id);

    await this.projectService.assertExists(id);

    return { data: { project } };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    await this.projectService.assertExists(id);

    const updatedProject = await this.projectService.update(
      id,
      updateProjectDto,
    );

    return { message: 'Project updated', data: { project: updatedProject } };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<object> {
    await this.projectService.assertExists(id);

    await this.projectService.remove(id);

    return { message: 'Project deleted' };
  }
}
