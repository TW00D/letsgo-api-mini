import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';

export class SortNameException extends HttpException {
  constructor(invalidProperty : string) {
    super(
      {
        message: ReasonPhrases.BAD_REQUEST,
        error: `'${invalidProperty}' 정렬 항목이 잘못 되었습니다. recent, popular, comments중에서 선택해주세요.`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
