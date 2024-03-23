import { Prisma } from '@prisma/client';

export class Comment implements Prisma.CommentCreateInput {
  content: string;
  parent_comment_id?: number;
  created_at?: string | Date;
  updated_at?: string | Date;
  user: Prisma.UserCreateNestedOneWithoutCommentInput;
  post: Prisma.PostCreateNestedOneWithoutCommentInput;
  like_comment?: Prisma.Like_commentCreateNestedManyWithoutCommentInput;
}
