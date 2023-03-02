import { Document } from './entities/document.entity';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { ElementToDocument } from './entities/elementToDocument.entity';
import { Module } from '@nestjs/common';
import { Project } from '../project/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Document, ElementToDocument, Project])],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
