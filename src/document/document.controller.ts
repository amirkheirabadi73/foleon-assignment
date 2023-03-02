import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async findAll() {
    const documents = await this.documentService.findAll();

    return { data: { documents } };
  }

  @Post()
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    const document = await this.documentService.create(createDocumentDto);

    return { message: 'Document created', data: { document } };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const document = await this.documentService.findOne(id);

    await this.documentService.assertExists(id);

    const elements = document.elementToDocument.map(
      (elementToDocument) => elementToDocument.element,
    );

    return {
      data: {
        document: {
          elements,
          id: document.id,
          created_at: document.created_at,
          name: document.name,
          project: document.project,
          updated_at: document.updated_at,
        },
      },
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    const document = await this.documentService.update(id, updateDocumentDto);

    return { message: 'Document updated', data: { document } };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<object> {
    await this.documentService.remove(id);

    return { message: 'Document deleted' };
  }
}
