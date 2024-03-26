import { Comment } from '../domain/comment.model';
import { CreateCommentRequest } from '../presentation/dto/Comment-create.dto';
import { UpdateCommentRequest } from '../presentation/dto/Comment-update.dto';

export interface CommentInterface {
  create(request: CreateCommentRequest): Promise<boolean>;
  readAll(user: number, post: number, Comment: number): Promise<Comment[]>;
  readAllByLike(user: number, category: number): Promise<Comment[]>;
  read(id: number): Promise<Comment>;
  update(id: number, request: UpdateCommentRequest): Promise<boolean>;
  like(id: number, user: number): Promise<boolean>;
  likeCancel(id: number, user: number): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
