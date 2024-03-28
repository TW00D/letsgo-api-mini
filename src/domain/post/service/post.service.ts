import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { CreatePostRequest } from '../presentation/dto/post-create.dto';
import { UserNotFoundException } from 'src/domain/user/exception/user-notfound.exception';
import { UserService } from 'src/domain/user/service/user.service';
import { CategoryService } from 'src/domain/category/service/category.service';
import { CategoryNotFoundException } from 'src/domain/category/exception/category-notfound.exception';
import { SortNameException } from '../exception/sort-name.exception';
import { Post } from '@prisma/client';
import { PostResponse } from '../presentation/dto/post-response.dto';
import { QueryFailedException } from '../exception/query-failed.exception';

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

  public async readAll(
    payload: any,
    order: string,
  ): Promise<PostResponse[] | undefined> {
    let posts: Post[] | undefined;
    let filterPosts: PostResponse[] | undefined;
    if (!order) {
      throw new QueryFailedException();
    }
    switch (order) {
      case 'recent':
        posts = await this.prismaService.post.findMany({
          orderBy: {
            created_at: 'desc',
          },
          include: {
            _count: {
              select: {
                like: true,
                comment: true,
              },
            },
            like: {
              where: {
                user: { username: payload.iss },
              },
            },
          },
        });
        filterPosts = posts.map((post) => {
          let posting = new PostResponse(post);
          return posting;
        });

        break;
      case 'comments':
        posts = await this.prismaService.post.findMany({
          orderBy: {
            comment: {
              _count: 'desc',
            },
          },
          include: {
            _count: {
              select: {
                like: true,
                comment: true,
              },
            },
            like: {
              where: {
                user: { username: payload.iss },
              },
            },
          },
        });
        filterPosts = posts.map((post) => {
          let posting = new PostResponse(post);
          return posting;
        });
        break;
      case 'popular':
        posts = await this.prismaService.post.findMany({
          orderBy: {
            like: {
              _count: 'desc',
            },
          },
          include: {
            _count: {
              select: {
                like: true,
                comment: true,
              },
            },
            like: {
              where: {
                user: { username: payload.iss },
              },
            },
          },
        });
        filterPosts = posts.map((post) => {
          let posting = new PostResponse(post);
          return posting;
        });
        break;
      default:
        throw new SortNameException(order);
    }
    return filterPosts;
  }
  
}
