import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';

export class UserAlreadyExistsException extends HttpException {
  constructor(username: string) {
    super(
      {
        message: ReasonPhrases.BAD_REQUEST,
        error: `A user with the name '${username}' already exists.`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
