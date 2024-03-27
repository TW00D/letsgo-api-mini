import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { CreatePostRequest } from '../presentation/dto/post-create.dto';
import { User } from '@prisma/client';
import { UserNotFoundException } from 'src/domain/user/exception/user-notfound.exception';
import { UserService } from 'src/domain/user/service/user.service';
import { CategoryService } from 'src/domain/category/service/category.service';
import { CategoryNotFoundException } from 'src/domain/category/exception/category-notfound.exception';
import { Payload } from 'src/global/lib/jwt/dto/payload.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  public async create(
    payload: any,
    request: CreatePostRequest,
  ): Promise<boolean> {
    const findUser = await this.userService.read(payload.iss);
    const findCategory = await this.categoryService.read(request.category);
    if (!findUser) {
      throw new UserNotFoundException(findUser.username);
    }

    if (!findCategory) {
      throw new CategoryNotFoundException();
    }

    await this.prismaService.post.create({
      data: await CreatePostRequest.ToModel(request, findUser),
    });

    return true;
  }
}
