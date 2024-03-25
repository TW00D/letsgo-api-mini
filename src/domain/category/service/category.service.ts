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
}
