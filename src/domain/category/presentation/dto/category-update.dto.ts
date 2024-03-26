import { IsNotEmpty, IsString } from 'class-validator';
import { ValidMessageConstants } from 'src/global/static/valid-message.constants';

export class UpdateCategoryRequest {
  @IsString({ message: ValidMessageConstants.CATEGORY_STRING })
  @IsNotEmpty({ message: ValidMessageConstants.CATEGORY_NOT_EMPTY })
  name: string;
}
