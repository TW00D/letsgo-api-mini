

import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';

export class PostFixOnlyMyException extends HttpException {
  constructor() {
    super(
      {
        message: ReasonPhrases.FORBIDDEN,
        error: '자신의 게시물만 수정 및 삭제할 수 있습니다.',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
