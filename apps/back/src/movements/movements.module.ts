import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoriesService } from 'src/categories/categories.service';
import { Movement } from './entities/movement.entity';
import { MovementsController } from './movements.controller';
import { MovementsService } from './movements.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movement]), CategoriesModule],
  controllers: [MovementsController],
  providers: [MovementsService, CategoriesService],
})
export class MovementsModule {}
