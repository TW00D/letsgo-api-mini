import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { RegisterRequest } from '../presentation/dto/register.dto';
import { UserNotFoundException } from 'src/domain/user/exception/user-notfound.exception';
import { UserAlreadyExistsException } from 'src/domain/user/exception/user-already-exists.exception';
import { PasswordNotMatchException } from '../exception/password-notmatch.exception';
import { TokenGenerateException } from 'src/global/exception/global/token-generate.exception';
import { TokenService } from 'src/global/lib/jwt/service/token.service';
import { LoginRequest } from '../presentation/dto/login.dto';
import { TokenResponse } from 'src/global/lib/jwt/dto/token.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async login(request: LoginRequest): Promise<TokenResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { username: request.username },
    });
    if (!user) {
      throw new UserNotFoundException(request.username);
    }

    if (!(await bcrypt.compare(request.password, user.password))) {
      throw new PasswordNotMatchException();
    }

    try {
      const result = await this.tokenService.generateUserToken({
        iss: request.username,
      });
      return result;
    } catch (error) {
      throw new TokenGenerateException();
    }
  }

  async register(request: RegisterRequest): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { username: request.username },
    });
    if (user) {
      throw new UserAlreadyExistsException(user.username);
    }

    const createdUser = await this.prismaService.user.create({
      data: await RegisterRequest.ToModel(request),
    });
    if (!createdUser) {
      throw new UserNotFoundException(request.username);
    }

    return true;
  }

  async refresh(payload: any): Promise<TokenResponse> {
    try {
      const result = await this.tokenService.generateUserToken({
        iss: payload.iss,
      });
      return result;
    } catch (error) {
      throw new TokenGenerateException();
    }
  }
}
