import { IsEmpty, IsString } from 'class-validator';
import { ValidMessageConstants } from 'src/global/static/valid-message.constants';

export class UpdateRequest {
  @IsString({ message: ValidMessageConstants.CATEGORY_STRING })
  @IsEmpty({ message: ValidMessageConstants.CATEGORY_NOT_EMPTY })
  nickname: string;
}
