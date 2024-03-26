import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { User } from '../domain/user.model';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async readAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users;
  }
}
