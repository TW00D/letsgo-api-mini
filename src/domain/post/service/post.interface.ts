import { Post } from '../domain/post.model';
import { CreatePostRequest } from '../presentation/dto/post-create.dto';
import { UpdatePostRequest } from '../presentation/dto/post-update.dto';

export interface PostInterface {
  create(request: CreatePostRequest): Promise<boolean>;
  readAll(category: number, user: number, order: string): Promise<Post[]>;
  readAllByLike(user: number, category: number): Promise<Post[]>;
  read(id: number): Promise<Post>;
  update(id: number, request: UpdatePostRequest): Promise<boolean>;
  like(id: number, user: number): Promise<boolean>;
  likeCancel(id: number, user: number): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
