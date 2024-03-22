import { IsString, Length } from "class-validator"
import { ValidMessageConstants } from "src/global/static/valid-message.constants"
import { ValidValue } from "src/global/validator/valid.value"


export class ChangePasswordRequest{
    @Length(ValidValue.PASSWORD_LENGTH_MIN, ValidValue.PASSWORD_LENGTH_MAX, {message : ValidMessageConstants.PASSWORD_LENGTH})
    @IsString({message : ValidMessageConstants.PASSWORD_STRING})
    @IsString({message : ValidMessageConstants.PASSWORD_NOT_EMPTY})
    password : string
    
    @Length(ValidValue.PASSWORD_LENGTH_MIN, ValidValue.PASSWORD_LENGTH_MAX, {message : ValidMessageConstants.PASSWORD_LENGTH})
    @IsString({message : ValidMessageConstants.PASSWORD_STRING})
    @IsString({message : ValidMessageConstants.PASSWORD_NOT_EMPTY})
    new_password : string
}