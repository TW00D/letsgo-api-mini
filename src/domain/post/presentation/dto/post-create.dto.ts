import { Post } from '../../domain/post.model';
import { IsNumber, IsString } from 'class-validator';
export class CreatePostRequest {
  @IsNumber()
  category: number;
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsString()
  picture: string;
  static async ToModel(request: CreatePostRequest, user: any): Promise<Post> {
    const post = new Post();

    post.user = { connect: { id: user.id } };
    post.category = { connect: { id: request.category } };
    post.title = request.title;
    post.content = request.content;
    post.picture = request.picture;

    return post;
  }
}
