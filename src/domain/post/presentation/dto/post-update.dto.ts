import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Post } from '../../domain/post.model';

export class UpdatePostRequest {
  @IsNumber()
  @IsNotEmpty()
  category: number;
  @IsString({})
  @IsNotEmpty()
  title: string;
  @IsString({})
  @IsNotEmpty()
  content: string;
  @IsString({})
  @IsNotEmpty()
  picture: string;
  static async ToModel(request: UpdatePostRequest): Promise<Post> {
    const post = new Post();

    post.category = { connect: { id: request.category } };
    post.title = request.title;
    post.content = request.content;
    post.picture = request.picture;

    return post;
  }
}
