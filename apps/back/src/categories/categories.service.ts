import { Injectable } from '@nestjs/common';
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

  async findOne(id: number) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
        relations: ['children'],
      });
      return category;
    } catch (e) {
      console.log(e);
      throw new Error('Error fetching category');
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
