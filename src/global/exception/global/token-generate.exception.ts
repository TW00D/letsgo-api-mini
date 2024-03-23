import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';

export class TokenGenerateException extends HttpException {
  constructor() {
    super(
      {
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        error: 'Unable to generate a token.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
