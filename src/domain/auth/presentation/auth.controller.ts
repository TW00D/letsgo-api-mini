import { Controller,Post,Body,HttpStatus, HttpCode } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { RegisterRequest } from "./dto/register.dto";
import { GeneralResponse } from "src/global/response/dto/response.dto";
import { ReasonPhrases } from "http-status-codes";


@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    async register(@Body() registerRequest: RegisterRequest): Promise<GeneralResponse> {
        const result = await this.authService.register(registerRequest)
        return GeneralResponse.of({
            code: HttpStatus.CREATED, 
            message: ReasonPhrases.CREATED, 
            data: result
        })
    }
}