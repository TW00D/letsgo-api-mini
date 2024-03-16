import { IsNotEmpty, IsString, Length } from "class-validator";
import { User } from "src/domain/user/domain/user.model";
import * as bcrypt from 'bcrypt';
import { ValidValue } from "src/global/validator/valid.value";
import { ValidMessageConstants } from "src/global/static/valid-message.constants";
import { BcryptValue } from "src/global/lib/bcrypt/bcrypt.value";


export class RegisterRequest {

    @Length(ValidValue.USERNAME_LENGTH_MIN,ValidValue.USERNAME_LENGTH_MAX,{message: ValidMessageConstants.USERNAME_LENGTH})
    @IsString({message: ValidMessageConstants.USERNAME_STRING})
    @IsNotEmpty({message: ValidMessageConstants.USERNAME_NOT_EMPTY})
    readonly username: string

    @Length(ValidValue.PASSWORD_LENGTH_MIN,ValidValue.PASSWORD_LENGTH_MAX,{message: ValidMessageConstants.PASSWORD_LENGTH})
    @IsString({message: ValidMessageConstants.PASSWORD_STRING})
    @IsNotEmpty({message: ValidMessageConstants.PASSWORD_NOT_EMPTY})
    readonly password: string

    @IsString({message: ValidMessageConstants.IMAGE_STRING})
    readonly image: string

    static async ToModel(request: RegisterRequest): Promise<User> {
        const user = new User()
        user.username = request.username
        user.password = await bcrypt.hash(request.password, BcryptValue.salt)
        user.image = request.image
        return user
    }
}