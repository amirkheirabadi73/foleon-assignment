import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { Repository } from 'typeorm';
import { ElementToDocument } from './entities/elementToDocument.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(ElementToDocument)
    private readonly elementToDocumentRepository: Repository<ElementToDocument>,
  ) {}

  async findAll(projectId?: number): Promise<Document[]> {
    return await this.documentRepository.find({
      where: {
        projectId: projectId !== undefined ? projectId : undefined,
      },
    });
  }

  async findOne(id: number): Promise<Document> {
    const document = await this.documentRepository.findOne({
      where: { id },
      relations: ['elementToDocument', 'elementToDocument.element', 'project'],
    });

    return {
      ...document,
      elementToDocument: this.sortElements(document.elementToDocument),
    };
  }

  async create({
    name,
    projectId,
    elements,
  }: CreateDocumentDto): Promise<Document> {
    const document = await this.documentRepository.save({ name, projectId });

    await this.syncElements(document.id, elements);

    return document;
  }

  async update(
    id: number,
    { name, projectId, elements }: UpdateDocumentDto,
  ): Promise<Document> {
    const document = await this.documentRepository.findOneBy({ id });
    document.name = name;

    if (projectId !== undefined) {
      document.projectId = projectId;
    }

    // Delete all elements from the pivot table and re-insert them with new order
    await this.elementToDocumentRepository.delete({ documentId: id });
    await this.syncElements(document.id, elements);

    return await this.documentRepository.save(document);
  }

  async remove(id: number): Promise<void> {
    await this.documentRepository.delete(id);
  }

  // Sort elements by order
  public sortElements(elements: ElementToDocument[]): ElementToDocument[] {
    return elements.sort((a, b) => a.order - b.order);
  }

  // Sync elements to document in the pivot table
  public async syncElements(
    documentId: number,
    elements: Record<number, number>,
  ): Promise<void> {
    const elementEntities = Object.entries(elements).map(
      ([order, elementId]) => ({
        documentId,
        elementId: Number(elementId),
        order: Number(order),
      }),
    );

    await this.elementToDocumentRepository
      .createQueryBuilder()
      .insert()
      .values(elementEntities)
      .execute();
  }

  async assertExists(id: number): Promise<Document> {
    const document = await this.documentRepository.findOneBy({ id });
    if (!document) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }

    return document;
  }
}
