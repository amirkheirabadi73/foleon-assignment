import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementToDocument } from './entities/elementToDocument.entity';
import { Project } from '../project/entities/project.entity';
import { Document } from './entities/document.entity';
import { Element, ElementType } from '../element/entities/element.entity';
import { ElementService } from '../element/element.service';
import { ProjectService } from '../project/project.service';

let projectId = undefined;

describe('DocumentService', () => {
  let service: DocumentService,
    elementService: ElementService,
    projectService: ProjectService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          database: 'foleon',
          entities: [Project, Document, Element, ElementToDocument],
          host: 'localhost',
          password: 'root',
          port: 5432,
          synchronize: true,
          type: 'postgres',
          username: 'postgres',
        }),
        TypeOrmModule.forFeature([
          Document,
          ElementToDocument,
          Element,
          Project,
        ]),
      ],
      providers: [DocumentService, ElementService, ProjectService],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
    elementService = module.get<ElementService>(ElementService);
    projectService = module.get<ProjectService>(ProjectService);

    const project = await projectService.create({
      name: 'test-project-name',
    });

    projectId = project.id;
  });

  afterAll(async () => {
    if (projectId !== undefined) {
      await projectService.remove(projectId);
    }

    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sorts the list of elements based on the order value', async () => {
    const unSortedElements = [
      {
        order: 2,
      },
      {
        order: 3,
      },
      {
        order: 1,
      },
    ] as ElementToDocument[];

    const documents = await service.sortElements(unSortedElements);
    expect(documents).toMatchObject([
      {
        order: 1,
      },
      {
        order: 2,
      },
      {
        order: 3,
      },
    ]);
  });

  it('should return an array of documents', async () => {
    const elementOne = await elementService.create({
      name: 'elementOne',
      projectId,
      type: ElementType.TEXT,
    });

    const elementTwo = await elementService.create({
      name: 'elementTwo',
      projectId,
      type: ElementType.TEXT,
    });

    const document = await service.create({
      name: 'documentName',
      projectId,
      elements: [],
    });

    await service.syncElements(document.id, {
      2: elementOne.id,
      1: elementTwo.id,
    });

    const documentInfo = await service.findOne(document.id);

    expect(documentInfo.elementToDocument.length).toBe(2);
  });
});
