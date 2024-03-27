import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryRequest } from './dto/category-create.dto';
import { CategoryService } from '../service/category.service';
import { GeneralResponse } from 'src/global/response/dto/response.dto';
import { ReasonPhrases } from 'http-status-codes';
import { Category } from '../domain/category.model';
import { UpdateCategoryRequest } from './dto/category-update.dto';

@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('/')
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
  @Get('/')
  async getAll(): Promise<GeneralResponse> {
    const result: Category[] | null = await this.categoryService.readAll();
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: result,
    });
  }
  @Get('/:id')
  async get(@Param('id') categoryId: number): Promise<GeneralResponse> {
    const result: Category | undefined =
      await this.categoryService.read(categoryId);
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: result,
    });
  }
  @Put('/:id')
  async update(
    @Param('id') categoryId: number,
    @Body() request: UpdateCategoryRequest,
  ): Promise<GeneralResponse> {
    const result: boolean | undefined = await this.categoryService.update(
      categoryId,
      request,
    );
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: true,
    });
  }

  @Delete('/:id')
  async delete(@Param('id') categoryId: number): Promise<GeneralResponse> {
    await this.categoryService.delete(categoryId);
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: true,
    });
  }
}
