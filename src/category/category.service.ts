import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    await Promise.all(
      categories.map(async (category) => {
        const categoryExists = await this.categoryRepository.findOne({
          where: { name: category },
        });

        if (!categoryExists) {
          const newCategory = this.categoryRepository.create({
            name: category,
          });
          await this.categoryRepository.save(newCategory);
        }
      }),
    );
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
}
