import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';

export class CategoryNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: ReasonPhrases.NOT_FOUND,
        error: '존재하지 않는 카테고리 입니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
