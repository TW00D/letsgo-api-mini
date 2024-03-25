import { Module } from '@nestjs/common';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../../service/category.service';
import { PrismaService } from 'prisma/service/prisma.service';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
export class CategoryModule {}
