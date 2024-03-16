import { IsNotEmpty, IsString, Length } from "class-validator";
import { ValidMessageConstants } from "src/global/static/valid-message.constants";
import { ValidValue } from "src/global/validator/valid.value";


export class LoginRequest {

    @Length(ValidValue.USERNAME_LENGTH_MIN,ValidValue.USERNAME_LENGTH_MAX,{message: ValidMessageConstants.USERNAME_LENGTH})
    @IsString({message: ValidMessageConstants.USERNAME_STRING})
    @IsNotEmpty({message: ValidMessageConstants.USERNAME_NOT_EMPTY})
    readonly username: string

    @Length(ValidValue.PASSWORD_LENGTH_MIN,ValidValue.PASSWORD_LENGTH_MAX,{message: ValidMessageConstants.PASSWORD_LENGTH})
    @IsString({message: ValidMessageConstants.PASSWORD_STRING})
    @IsNotEmpty({message: ValidMessageConstants.PASSWORD_NOT_EMPTY})
    readonly password: string
}