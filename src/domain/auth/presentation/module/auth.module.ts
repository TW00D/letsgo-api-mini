import { Module } from '@nestjs/common';
import { AuthController } from '../auth.controller';
import { AuthService } from '../../service/auth.service';
import { PrismaService } from 'prisma/service/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from 'src/global/lib/jwt/service/token.service';
import { AccessTokenStrategy } from 'src/global/lib/jwt/strategy/access-token.strategy';
import { RefreshTokenStrategy } from 'src/global/lib/jwt/strategy/refresh-token.strategy';

@Module({
    controllers: [AuthController],
    providers:[AuthService,PrismaService,TokenService,AccessTokenStrategy,RefreshTokenStrategy],
    imports:[
        PassportModule,
        JwtModule.register({})
    ]
})
export class AuthModule{}