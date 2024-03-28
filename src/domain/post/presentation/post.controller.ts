import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { GeneralResponse } from 'src/global/response/dto/response.dto';
import { CreatePostRequest } from './dto/post-create.dto';
import { ReasonPhrases } from 'http-status-codes';
import { TokenInfo } from 'src/global/decorator/token.decorator';
import { AccessTokenGuard } from 'src/global/lib/jwt/guard/access-token.guard';
import { PostResponse } from './dto/post-response.dto';
import { UpdatePostRequest } from './dto/post-update.dto';
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
    @Query('category') categoryId: number,
    @Query('user') userId: number,
    @Query('order') order: string,
  ): Promise<GeneralResponse> {
    const posts: PostResponse[] | undefined = await this.postService.readAll(
      categoryId,
      userId,
      userInfo,
      order,
    );

    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: posts,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @UseGuards(AccessTokenGuard)
  async read(
    @TokenInfo() userInfo: any,
    @Param('id') postId: number,
  ): Promise<GeneralResponse> {
    const post: PostResponse = await this.postService.read(userInfo, postId);
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: post,
    });
  }
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  @UseGuards(AccessTokenGuard)
  async update(
    @TokenInfo() userInfo: any,
    @Param('id') postId: number,
    @Body() request: UpdatePostRequest,
  ): Promise<GeneralResponse> {
    await this.postService.update(userInfo, request, postId);
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: true,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  @UseGuards(AccessTokenGuard)
  async delete(
    @TokenInfo() userInfo: any,
    @Param('id') postId: number,
  ): Promise<GeneralResponse> {
    await this.postService.delete(postId, userInfo);
    return GeneralResponse.of({
      code: HttpStatus.OK,
      message: ReasonPhrases.OK,
      data: true,
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/:id/like')
  @UseGuards(AccessTokenGuard)
  async like(
    @TokenInfo() userInfo: any,
    @Param('id') postId: number,
  ): Promise<GeneralResponse> {
    await this.postService.like(userInfo, postId);
    return GeneralResponse.of({
      code: HttpStatus.CREATED,
      message: ReasonPhrases.CREATED,
      data: true,
    });
  }
}
