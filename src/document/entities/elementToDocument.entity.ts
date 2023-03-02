import { Document } from '../../document/entities/document.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Element } from '../../element/entities/element.entity';
import { defaultIfEmpty } from 'rxjs';

@Entity()
export class ElementToDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  order: number;

  @Column()
  public documentId: number;

  @Column()
  public elementId: number;

  @ManyToOne(() => Document, (document) => document.elementToDocument, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public document: Document;

  @ManyToOne(() => Element, (element) => element.elementToDocument, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public element: Element;
}
