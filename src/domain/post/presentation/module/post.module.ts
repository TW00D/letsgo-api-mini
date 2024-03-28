import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { PostService } from '../../service/post.service';
import { PostController } from '../post.controller';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
