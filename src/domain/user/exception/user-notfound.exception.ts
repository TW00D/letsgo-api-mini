import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';

export class UserNotFoundException extends HttpException {
  constructor(username: string) {
    super(
      {
        message: ReasonPhrases.NOT_FOUND,
        error: `No users with the name '${username}' were found.`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
