import { IsNotEmpty, IsString } from 'class-validator';
import { ValidMessageConstants } from 'src/global/static/valid-message.constants';
import { Category } from '../../domain/category.model';

export class UpdateCategoryRequest {
  @IsString({ message: ValidMessageConstants.CATEGORY_STRING })
  @IsNotEmpty({ message: ValidMessageConstants.CATEGORY_NOT_EMPTY })
  name: string;

  @IsString({ message: ValidMessageConstants.ICON_STRING })
  @IsNotEmpty({ message: ValidMessageConstants.ICON_NOT_EMPTY })
  icon: string;

  static async ToModel(request: UpdateCategoryRequest): Promise<Category> {
    const category = new Category();
    category.name = request.name;
    category.icon = request.icon;
    return category;
  }
}
