import { RegisterRequest } from "../presentation/dto/register.dto";

export interface AuthInterface {
    register(request: RegisterRequest): Promise<boolean>
}