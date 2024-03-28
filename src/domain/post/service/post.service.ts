import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { CreatePostRequest } from '../presentation/dto/post-create.dto';
import { UserNotFoundException } from 'src/domain/user/exception/user-notfound.exception';
import { UserService } from 'src/domain/user/service/user.service';
import { CategoryService } from 'src/domain/category/service/category.service';
import { CategoryNotFoundException } from 'src/domain/category/exception/category-notfound.exception';
import { SortNameException } from '../exception/sort-name.exception';
import { Post, User } from '@prisma/client';
import { PostResponse } from '../presentation/dto/post-response.dto';
import { PostNotFoundException } from '../exception/post-notfound.exception';
import { UpdatePostRequest } from '../presentation/dto/post-update.dto';
import { PostFixOnlyMyException } from '../exception/fix-only-my.exception';
import { AlreadyLikeException } from '../exception/already-like.exception';
import { AlreadyUnlikeException } from '../exception/already-unlike.exception';

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
    categoryId: number,
    userId: number,
    payload: any,
    order: string,
  ): Promise<PostResponse[] | undefined> {
    let posts: Post[] | undefined;
    let filterPosts: PostResponse[] | undefined;
    const whereConditions: any = {};

    if (!isNaN(categoryId)) {
      whereConditions.category_id = categoryId;
    }
    if (!isNaN(userId)) {
      whereConditions.user_id = userId;
    }
    if (order) {
      switch (order) {
        case 'recent':
          posts = await this.prismaService.post.findMany({
            where: whereConditions,
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
          break;
        case 'comments':
          posts = await this.prismaService.post.findMany({
            where: whereConditions,
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
          break;
        case 'popular':
          posts = await this.prismaService.post.findMany({
            where: whereConditions,
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
          break;
        default:
          throw new SortNameException(order);
      }
    } else {
      posts = await this.prismaService.post.findMany({
        where: whereConditions,
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
    }

    if (posts) {
      filterPosts = posts.map((post) => new PostResponse(post));
    }
    return filterPosts;
  }
  public async read(
    payload: any,
    postId: number,
  ): Promise<PostResponse | undefined> {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
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
    if (!post) {
      throw new PostNotFoundException();
    }
    return new PostResponse(post);
  }
  public async update(
    payload: any,
    request: UpdatePostRequest,
    postId: number,
  ): Promise<boolean> {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: { user: true },
    });

    const user = await this.userService.read(post.user.username);

    if (!post) {
      throw new PostNotFoundException();
    }

    if (user.username !== payload.iss) {
      throw new PostFixOnlyMyException();
    }

    await this.prismaService.post.update({
      where: { id: postId },
      data: await UpdatePostRequest.ToModel(request),
    });

    return true;
  }

  public async delete(postId: number, payload: any): Promise<boolean> {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: { user: true },
    });
    const user = await this.userService.read(post.user.username);
    if (!post) {
      throw new PostNotFoundException();
    }

    if (user.username !== payload.iss) {
      throw new PostFixOnlyMyException();
    }

    await this.prismaService.post.delete({ where: { id: postId } });
    return true;
  }

  public async like(payload: any, postId: number): Promise<boolean> {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new PostNotFoundException();
    }
    const isAlreadyLike = await this.prismaService.like.findFirst({
      where: {
        user: { username: payload.iss },
        post_id: postId,
      },
    });
    if (isAlreadyLike) {
      throw new AlreadyLikeException();
    }
    await this.prismaService.like.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { username: payload.iss } },
      },
    });
    return true;
  }

  public async unlike(payload: any, postId: number): Promise<boolean> {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: { user: true },
    });
    const user = await this.userService.read(post.user.username);

    if (!post) {
      throw new PostNotFoundException();
    }

    const like = await this.prismaService.like.findFirst({
      where: {
        user: { username: payload.iss },
        post_id: postId,
      },
    });

    if (!like) {
      throw new AlreadyUnlikeException();
    }

    await this.prismaService.like.delete({ where: { id: like.id } });

    return true;
  }
}
