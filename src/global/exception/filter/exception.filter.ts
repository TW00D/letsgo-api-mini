import { Catch, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { GeneralResponse } from "../../response/dto/response.dto";

@Catch(HttpException)
export class ExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ExecutionContext) {
        const response = host.switchToHttp().getResponse()
        const errorStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        const errorResponse: any = exception.getResponse()
    
        response.status(errorStatus).json(GeneralResponse.of({
            code: errorStatus, 
            message: errorResponse.message,
            data: errorResponse.error
        }))
    }
}