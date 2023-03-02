import { ElementToDocument } from '../../document/entities/elementToDocument.entity';
import { Project } from '../../project/entities/project.entity';
import { ManyToOne } from 'typeorm';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum ElementType {
  TEXT = 'text',
  IMAGE = 'image',
  BUTTON = 'button',
}

@Entity()
export class Element {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: ElementType;

  @OneToMany(
    () => ElementToDocument,
    (elementToDocument) => elementToDocument.element,
  )
  public elementToDocument: ElementToDocument[];

  @Column()
  public projectId: number;

  @ManyToOne(() => Project, (project) => project.elements, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  project: Project;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
