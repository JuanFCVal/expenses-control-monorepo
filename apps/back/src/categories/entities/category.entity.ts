import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryType } from './category.config';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.children)
  @JoinColumn({ name: 'parentId' })
  public parent?: Category;

  @OneToMany(() => Category, (category) => category.parent)
  public children: Category[];

  @Column({ default: true })
  public active: boolean;

  @Column({ nullable: false, default: CategoryType.EXPENSE })
  public type: CategoryType;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
