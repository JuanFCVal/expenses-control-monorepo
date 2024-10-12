import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      return await this.categoryRepository.save(category);
    } catch (e) {
      console.log(e);
      throw new Error('Error creating category');
    }
  }
  async findAll() {
    try {
      const categories = await this.categoryRepository.find({
        where: { parent: null },
        relations: ['children'],
      });
      return categories;
    } catch (e) {
      console.log(e);
      throw new Error('Error fetching categories');
    }
  }

  async findOne(id: number, fetchChildren = true) {
    try {
      const query = {
        where: { id },
        relations: fetchChildren ? ['children'] : [],
      };
      const category = await this.categoryRepository.findOne(query);
      if (!category) {
        throw new BadRequestException('Category not found');
      }
      return category;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Category not found');
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return this.categoryRepository.update(id, updateCategoryDto);
    } catch (e) {
      console.log(e);
      throw new Error('Error updating category');
    }
  }

  remove(id: number) {
    try {
      return this.categoryRepository.update(id, { active: false });
    } catch (e) {
      console.log(e);
      throw new Error('Error deleting category');
    }
  }
}
