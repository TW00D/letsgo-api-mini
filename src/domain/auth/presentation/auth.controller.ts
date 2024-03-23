import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterRequest } from './dto/register.dto';
import { GeneralResponse } from 'src/global/response/dto/response.dto';
import { ReasonPhrases } from 'http-status-codes';
import { LoginRequest } from './dto/login.dto';
import { RefreshTokenGuard } from 'src/global/lib/jwt/guard/refresh-token.guard';
import { TokenInfo } from 'src/global/decorator/token.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginRequest: LoginRequest): Promise<GeneralResponse> {
    const result = await this.authService.login(loginRequest);
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: result,
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(
    @Body() registerRequest: RegisterRequest,
  ): Promise<GeneralResponse> {
    const result = await this.authService.register(registerRequest);
    return GeneralResponse.of({
      code: HttpStatus.CREATED,
      message: ReasonPhrases.CREATED,
      data: result,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/token/refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@TokenInfo() userInfo: any): Promise<GeneralResponse> {
    const result = await this.authService.refresh(userInfo);
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: result,
    });
  }
}
