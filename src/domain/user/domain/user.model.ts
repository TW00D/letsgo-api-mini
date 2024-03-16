import { Prisma } from "@prisma/client";


export class User implements Prisma.UserCreateInput{
    username: string
    password: string
    image?: string
    createdAt: Date
    updatedAt: Date
}