import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';

export class QueryFailedException extends HttpException {
  constructor() {
    super(
      {
        message: ReasonPhrases.BAD_REQUEST,
        error: `정렬 항목을 선택해주세요.`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
