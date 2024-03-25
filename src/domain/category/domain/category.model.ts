import { Prisma, PrismaClient } from '@prisma/client';

export class Category implements Prisma.CategoryCreateInput {
  name: string;
  created_at: Date;
  updated_at: Date;
}
