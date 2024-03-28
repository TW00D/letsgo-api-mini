import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { GeneralResponse } from 'src/global/response/dto/response.dto';
import { CreatePostRequest } from './dto/post-create.dto';
import { ReasonPhrases } from 'http-status-codes';
import { TokenInfo } from 'src/global/decorator/token.decorator';
import { User } from '@prisma/client';

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  public async create(
    @TokenInfo() user: User,
    @Body() request: CreatePostRequest,
  ): Promise<GeneralResponse> {
    await this.postService.create(user, request);
    return GeneralResponse.of({
      code: HttpStatus.CREATED,
      message: ReasonPhrases.OK,
      data: true,
    });
  }
}
