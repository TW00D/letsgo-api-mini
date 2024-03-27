import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { PostService } from '../../service/post.service';
import { PostController } from '../post.controller';
import { UserService } from 'src/domain/user/service/user.service';
import { CategoryService } from 'src/domain/category/service/category.service';
import { AccessTokenStrategy } from 'src/global/lib/jwt/strategy/access-token.strategy';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    PrismaService,
    UserService,
    CategoryService,
  ],
})
export class PostModule {}
