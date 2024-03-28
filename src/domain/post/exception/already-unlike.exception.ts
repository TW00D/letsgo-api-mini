

import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';

export class AlreadyUnlikeException extends HttpException {
  constructor() {
    super(
      {
        message: ReasonPhrases.BAD_REQUEST,
        error: '좋아요를 누르지 않은 게시물 입니다.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
