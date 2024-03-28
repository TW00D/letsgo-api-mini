import { Prisma } from '@prisma/client';
import { Post } from '../../domain/post.model';
import { User } from 'src/domain/user/domain/user.model';
export class CreatePostRequest {
  category: Prisma.CategoryCreateNestedOneWithoutPostInput;
  title: string;
  content: string;
  picture?: string;
  static async ToModel(request: CreatePostRequest, user: Prisma.UserCreateNestedOneWithoutPostInput): Promise<Post> {
    const post = new Post();

    post.user = user
    post.category = request.category;
    post.title = request.title;
    post.content = request.content;
    post.picture = request.picture ? request.picture : null;

    return post;
  }
}
