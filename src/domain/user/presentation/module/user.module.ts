import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { UserController } from '../user.controller';
import { UserService } from '../../service/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class AuthModule {}
