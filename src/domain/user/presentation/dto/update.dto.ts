import { IsString, Length } from "class-validator";
import { ValidMessageConstants } from "src/global/static/valid-message.constants";
import { ValidValue } from "src/global/validator/valid.value";

export class UpdateRequest{
    @Length(ValidValue.USERNAME_LENGTH_MIN,ValidValue.PASSWORD_LENGTH_MAX, {message : ValidMessageConstants.PASSWORD_LENGTH})
    @IsString({message: ValidMessageConstants.USERNAME_STRING})
    readonly new_username: string

    @IsString({message :ValidMessageConstants.IMAGE_STRING})
    readonly new_image : string
}