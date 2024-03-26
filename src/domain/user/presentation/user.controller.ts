import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import { GeneralResponse } from 'src/global/response/dto/response.dto';
import { ReasonPhrases } from 'http-status-codes';
import { AccessTokenGuard } from 'src/global/lib/jwt/guard/access-token.guard';
import { UserService } from '../service/user.service';

@Controller('/user')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AccessTokenGuard)
  async readAll(): Promise<GeneralResponse> {
    const result = await this.userService.readAll();
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: result,
    });
  }
}
