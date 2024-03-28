import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { GeneralResponse } from 'src/global/response/dto/response.dto';
import { CreatePostRequest } from './dto/post-create.dto';
import { ReasonPhrases } from 'http-status-codes';
import { TokenInfo } from 'src/global/decorator/token.decorator';
import { AccessTokenGuard } from 'src/global/lib/jwt/guard/access-token.guard';
import { Post as PostModel } from '@prisma/client';
import { PostResponse } from './dto/post-response.dto';
import { userInfo } from 'os';

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  @UseGuards(AccessTokenGuard)
  async create(
    @TokenInfo() userInfo: any,
    @Body() request: CreatePostRequest,
  ): Promise<GeneralResponse> {
    await this.postService.create(userInfo, request);
    return GeneralResponse.of({
      code: HttpStatus.CREATED,
      message: ReasonPhrases.CREATED,
      data: true,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(AccessTokenGuard)
  async readAll(
    @TokenInfo() userInfo: any,
    @Query('order') order: string,
  ): Promise<GeneralResponse> {
    const posts: PostResponse[] | undefined = await this.postService.readAll(
      userInfo,
      order,
    );
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: posts,
    });
  }
}
