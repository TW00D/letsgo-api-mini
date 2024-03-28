import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { CreatePostRequest } from '../presentation/dto/post-create.dto';
import { User } from '@prisma/client';
import { UserNotFoundException } from 'src/domain/user/exception/user-notfound.exception';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    user: User,
    request: CreatePostRequest,
  ): Promise<boolean> {
      
    if(!user){
      throw new UserNotFoundException("hello");
    }
    const postModel = await CreatePostRequest.ToModel(request, {
      connect: user,
    });
    await this.prismaService.post.create({
      data: postModel,
    });

    return true;
  }
}
