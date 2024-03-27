import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { User } from '../domain/user.model';
import { UpdateRequest } from '../presentation/dto/update.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async readAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async read(username: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { username: username },
    });
    return user;
  }

  async update(username: string, request: UpdateRequest): Promise<boolean> {
    const user = await this.prismaService.user.update({
      data: {
        username: request.new_username,
        nickname: request.new_nickname,
        image: request.new_image,
      },
      where: { username: username },
    });
    return true;
  }

  async delete(username: string): Promise<boolean> {
    const user = await this.prismaService.user.delete({
      where: { username: username },
    });
    return true;
  }
}
