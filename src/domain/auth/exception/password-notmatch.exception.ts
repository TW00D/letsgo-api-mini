import { HttpException, HttpStatus } from "@nestjs/common";
import { ReasonPhrases } from "http-status-codes";

export class PasswordNotMatchException extends HttpException {
    constructor() { super(
        {
            message: ReasonPhrases.BAD_REQUEST,
            error: "The passwords don't match."
        },
        HttpStatus.BAD_REQUEST
    )}
}