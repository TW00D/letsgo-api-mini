import { Prisma } from '@prisma/client';

export class Post implements Prisma.PostCreateInput {
  title: string;
  content: string;
  viewed: number;
  picture: string;

  user: Prisma.UserCreateNestedOneWithoutPostInput;
  category: Prisma.CategoryCreateNestedOneWithoutPostInput;

  created_at: string;
  updated_at: string;
}
