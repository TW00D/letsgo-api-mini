import { Category } from '../domain/category.model';
import { CreateRequest } from '../presentation/dto/category-create.dto';
import { UpdateRequest } from '../presentation/dto/category-update.dto';

export interface CategoryInterface {
  create(request: CreateRequest): Promise<boolean>;
  readAll(): Promise<Category[]>;
  read(id: number): Promise<Category>;
  update(id: number, request: UpdateRequest): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
