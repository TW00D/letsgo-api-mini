import { ValidationPipe } from "@nestjs/common"
import { BadRequestException } from "../exception/global/dto-badrequest.exception"

export const ValidationPipeSetting = new ValidationPipe({
    exceptionFactory: (errors) => {
        return new BadRequestException(errors.map((error) => ({
            property: error.property,
            message: error.constraints
        })))
    },
    stopAtFirstError: false,
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
})