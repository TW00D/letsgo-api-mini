import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { GeneralResponse } from 'src/global/response/dto/response.dto';
import { ReasonPhrases } from 'http-status-codes';
import { AccessTokenGuard } from 'src/global/lib/jwt/guard/access-token.guard';
import { UserService } from '../service/user.service';
import { UpdateRequest } from './dto/update.dto';

@Controller('/user')
export class UserController {
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

  @HttpCode(HttpStatus.OK)
  @Get('/username/:username')
  @UseGuards(AccessTokenGuard)
  async read(@Param('username') username: string): Promise<GeneralResponse> {
    const result = await this.userService.read(username);
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: result,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Put('/username/:username')
  @UseGuards(AccessTokenGuard)
  async update(
    @Param('username') username: string,
    @Body() request: UpdateRequest,
  ): Promise<GeneralResponse> {
    const result = await this.userService.update(username, request);
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: result,
    });
  }
}
