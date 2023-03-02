import { Project } from '../../project/entities/project.entity';
import { ElementToDocument } from './elementToDocument.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Project, (project) => project.documents, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  project: Project;

  @Column()
  public projectId: number;

  @OneToMany(
    () => ElementToDocument,
    (elementToDocument) => elementToDocument.document,
  )
  public elementToDocument: ElementToDocument[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
