import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/service/prisma.service";
import { RegisterRequest } from "../presentation/dto/register.dto";
import { UserNotFoundException } from "src/domain/user/exception/user-notfound.exception";
import { UserAlreadyExistsException } from "src/domain/user/exception/user-already-exists.exception";
import { AuthInterface } from "./auth.interface";

@Injectable()
export class AuthService implements AuthInterface {
    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async register(request: RegisterRequest): Promise<boolean> {
        const user = await this.prismaService.user.findUnique({
            where: {username: request.username}
        })
        if (user) {
            throw new UserAlreadyExistsException(user.username)
        }

        const createdUser = await this.prismaService.user.create({data: await RegisterRequest.ToModel(request)})
        if(!createdUser){
            throw new UserNotFoundException(request.username)
        }

        return true
    }
}