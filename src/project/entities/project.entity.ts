import { Document } from '../../document/entities/document.entity';
import { Element } from '../../element/entities/element.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Document, (document) => document.project)
  documents: Document[];

  @OneToMany(() => Element, (element) => element.project)
  elements: Element[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
