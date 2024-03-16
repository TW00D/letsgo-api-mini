import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TokenInfo = createParamDecorator((data: string, host: ExecutionContext) => {
    const context = host.switchToHttp().getRequest()
    return context.user
})