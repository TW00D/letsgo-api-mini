import { IsNotEmpty, IsString } from 'class-validator';
import { ValidMessageConstants } from 'src/global/static/valid-message.constants';
import { Category } from '../../domain/category.model';

export class CreateCategoryRequest {
  @IsString({ message: ValidMessageConstants.CATEGORY_STRING })
  @IsNotEmpty({ message: ValidMessageConstants.CATEGORY_NOT_EMPTY })
  name: string;

  static async ToModel(request: CreateCategoryRequest): Promise<Category> {
    const category = new Category();
    category.name = request.name;

    return category;
  }
}
