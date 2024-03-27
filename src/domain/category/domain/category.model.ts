import { Prisma, PrismaClient } from '@prisma/client';

export class Category implements Prisma.CategoryCreateInput {
  name: string;
  icon: string;
  created_at: Date;
  updated_at: Date;
}
