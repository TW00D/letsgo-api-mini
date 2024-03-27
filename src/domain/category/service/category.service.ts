import { Injectable } from '@nestjs/common';
import { Category } from '../domain/category.model';
import { CreateCategoryRequest } from '../presentation/dto/category-create.dto';
import { PrismaService } from 'prisma/service/prisma.service';
import { UpdateCategoryRequest } from '../presentation/dto/category-update.dto';
import { CategoryNotFoundException } from '../exception/category-notfound.exception';
import { CategoryInterface } from './category.interface';

@Injectable()
export class CategoryService implements CategoryInterface {
  constructor(private readonly prismaService: PrismaService) {}
  public async create(request: CreateCategoryRequest): Promise<boolean> {
    const category: Category = await this.prismaService.category.create({
      data: await CreateCategoryRequest.ToModel(request),
    });
    return true;
  }

  public async readAll(): Promise<Category[]> {
    const category: Category[] | undefined =
      await this.prismaService.category.findMany({});
    return category;
  }

  public async read(categoryId: number): Promise<Category> {
    const category: Category | undefined =
      await this.prismaService.category.findFirst({
        where: { id: categoryId },
      });
    return category;
  }
  public async update(
    categoryId: number,
    request: UpdateCategoryRequest,
  ): Promise<boolean> {
    const category: Category | undefined =
      await this.prismaService.category.findUnique({
        where: { id: categoryId },
      });
    if (!category) {
      throw new CategoryNotFoundException();
    }
    const result: Category = await this.prismaService.category.update({
      where: { id: categoryId },
      data: await UpdateCategoryRequest.ToModel(request),
    });

    return true;
  }

  public async delete(categoryId: number): Promise<boolean> {
    const category: Category | undefined =
      await this.prismaService.category.findUnique({
        where: { id: categoryId },
      });
    if (!category) {
      throw new CategoryNotFoundException();
    }
    await this.prismaService.category.delete({ where: { id: categoryId } });
    return true
  }
}
