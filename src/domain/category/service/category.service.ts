import { Injectable } from '@nestjs/common';
import { Category } from '../domain/category.model';
import { CreateCategoryRequest } from '../presentation/dto/category-create.dto';
import { PrismaService } from 'prisma/service/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  public async create({ nickname }: CreateCategoryRequest): Promise<Category> {
    const category: Category = await this.prismaService.category.create({
      data: { name: nickname },
    });
    return category;
  }

  public async getAll(): Promise<Category[]> {
    const category: Category[] | undefined =
      await this.prismaService.category.findMany({});
    return category;
  }

  public async get(categoryId: number): Promise<Category> {
    const category: Category | undefined =
      await this.prismaService.category.findFirst({
        where: { id: categoryId },
      });
    return category;
  }
}
