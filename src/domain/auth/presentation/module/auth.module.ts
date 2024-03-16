import { Module } from '@nestjs/common';
import { AuthController } from '../auth.controller';
import { AuthService } from '../../service/auth.service';
import { PrismaService } from 'prisma/service/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [AuthController],
    providers:[AuthService,PrismaService],
    imports:[
        PassportModule,
        JwtModule.register({})
    ]
})
export class AuthModule{}