import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { CreateMovementDto } from './dto/create-movement.dto';
import { Movement } from './entities/movement.entity';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,
    private readonly categoryService: CategoriesService,
  ) {}
  async create(createMovementDto: CreateMovementDto) {
    try {
      const category = await this.categoryService.findOne(
        createMovementDto.categoryId,
        false,
      );

      const movement = this.movementRepository.create({
        ...createMovementDto,
        category,
      });

      return await this.movementRepository.save(movement);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
    }
  }

  findAll() {
    try {
      return this.movementRepository.find({ relations: ['category'] });
    } catch (e) {
      console.log(e);
      throw new Error('Error fetching movements');
    }
  }

  remove(id: number) {
    try {
      return this.movementRepository.delete(id);
    } catch (e) {
      console.log(e);
      throw new Error('Error deleting movement');
    }
  }
}
