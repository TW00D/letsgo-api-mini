import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';

export class PostNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: ReasonPhrases.NOT_FOUND,
        error: '존재하지 않는 게시물 입니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
