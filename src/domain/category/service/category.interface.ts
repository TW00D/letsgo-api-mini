import { Category } from '../domain/category.model';
import { CreateCategoryRequest } from '../presentation/dto/category-create.dto';
import { UpdateCategoryRequest } from '../presentation/dto/category-update.dto';

export interface CategoryInterface {
  create(request: CreateCategoryRequest): Promise<boolean>;
  readAll(): Promise<Category[]>;
  read(id: number): Promise<Category>;
  update(id: number, request: UpdateCategoryRequest): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
