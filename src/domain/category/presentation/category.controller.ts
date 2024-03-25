import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateCategoryRequest } from './dto/category-create.dto';
import { CategoryService } from '../service/category.service';
import { GeneralResponse } from 'src/global/response/dto/response.dto';
import { ReasonPhrases } from 'http-status-codes';
import { Category } from '../domain/category.model';

@Controller('')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('/category')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCategoryRequest: CreateCategoryRequest,
  ): Promise<GeneralResponse> {
    const result = await this.categoryService.create(createCategoryRequest);
    return GeneralResponse.of({
      code: HttpStatus.CREATED,
      message: ReasonPhrases.OK,
      data: true,
    });
  }
  @Get('/category')
  async getAll(): Promise<GeneralResponse> {
    const result: Category[] | null = await this.categoryService.getAll();
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: result,
    });
  }
  @Get('/category/:id')
  async get(@Param('id') categoryId: number): Promise<GeneralResponse> {
    const result: Category | undefined =
      await this.categoryService.get(categoryId);
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: result,
    });
  }
}
