

import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';

export class AlreadyLikeException extends HttpException {
  constructor() {
    super(
      {
        message: ReasonPhrases.BAD_REQUEST,
        error: '이미 좋아요를 누른 게시물 입니다.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
