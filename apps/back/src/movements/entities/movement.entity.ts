import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WORTHINESS } from './movement.config';

@Entity()
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column('date')
  date: Date;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @Column({ nullable: true, default: WORTHINESS.NEUTRAL })
  worthIt: WORTHINESS;

  @CreateDateColumn()
  createdAt: Date;
}
