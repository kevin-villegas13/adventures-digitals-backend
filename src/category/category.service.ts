import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryType } from './enum/category.type';
@Injectable()
export class CategoryService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async onApplicationBootstrap() {
    setTimeout(() => this.seedCategories(), 0);
  }

  private async seedCategories() {
    const categories = Object.values(CategoryType);

    const existingCategories = await this.categoryRepository.find({
      where: { name: In(categories) },
    });

    const existingCategoryNames = new Set(
      existingCategories.map((cat) => cat.name),
    );

    const newCategories = categories
      .filter((category) => !existingCategoryNames.has(category))
      .map((name) => this.categoryRepository.create({ name }));

    if (newCategories.length > 0) {
      await this.categoryRepository.save(newCategories);
    }
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
}
