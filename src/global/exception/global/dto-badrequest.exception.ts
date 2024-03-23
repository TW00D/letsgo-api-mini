import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';

export class BadRequestException extends HttpException {
  constructor(error: any) {
    super(
      {
        message: ReasonPhrases.BAD_REQUEST,
        error: error,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
