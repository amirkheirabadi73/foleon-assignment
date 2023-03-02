import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

const defaultDocument = {
  id: 1,
  name: 'test-document-name',
  project: {
    id: 1,
    name: 'test-project-name',
  },
  created_at: new Date('2030-01-01'),
  updated_at: new Date('2030-01-01'),
  elementToDocument: [],
};

describe('DocumentController', () => {
  let controller: DocumentController;
  let spyDocumentService: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        {
          provide: DocumentService,
          useFactory: () => ({
            findAll: jest.fn(() => {
              return [defaultDocument];
            }),
            findOne: jest.fn((id) => {
              return id == 1 ? defaultDocument : undefined;
            }),
            assertExists: jest.fn((id) => {
              return id == 1 ? true : false;
            }),
            create: jest.fn((document) => {
              return {
                id: 1,
                name: document.name,
                project: {
                  id: document.projectId,
                  name: 'test-project-name',
                },
              };
            }),
            update: jest.fn((id, document) => {
              return {
                id: id,
                name: document.name,
                project: {
                  id: document.projectId,
                  name: 'test-project-name',
                },
              };
            }),
            remove: jest.fn((id) => {
              return true;
            }),
          }),
        },
      ],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
    spyDocumentService = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call DocumentService.findAll', () => {
    const spy = jest.spyOn(spyDocumentService, 'findAll');
    controller.findAll();
    expect(spy).toHaveBeenCalled();
  });

  it('should call DocumentService.findOne', async () => {
    const spy = jest.spyOn(spyDocumentService, 'findOne');
    const result = await controller.findOne(1);
    expect(spy).toHaveBeenCalled();
    expect(result).toMatchObject({
      data: {
        document: {
          id: 1,
          name: 'test-document-name',
          project: {
            id: 1,
            name: 'test-project-name',
          },
        },
      },
    });
  });

  it('should call DocumentService.create', async () => {
    const result = await controller.create({
      name: 'test-document-name',
      projectId: 1,
      elements: [],
    });
    expect(result).toMatchObject({
      data: {
        document: {
          id: 1,
          name: 'test-document-name',
          project: {
            id: 1,
            name: 'test-project-name',
          },
        },
      },
      message: 'Document created',
    });
  });

  it('should call DocumentService.update', async () => {
    const result = await controller.update(1, {
      name: 'test-document-name',
      projectId: 1,
      elements: [],
    });
    expect(result).toMatchObject({
      data: {
        document: {
          id: 1,
          name: 'test-document-name',
          project: {
            id: 1,
            name: 'test-project-name',
          },
        },
      },
      message: 'Document updated',
    });
  });

  it('should call DocumentService.remove', async () => {
    const result = await controller.remove(1);
    expect(result).toMatchObject({
      message: 'Document deleted',
    });
  });
});
