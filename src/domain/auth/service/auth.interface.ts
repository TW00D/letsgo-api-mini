import { TokenResponse } from 'src/global/lib/jwt/dto/token.dto';
import { RegisterRequest } from '../presentation/dto/register.dto';
import { LoginRequest } from '../presentation/dto/login.dto';

export interface AuthInterface {
  login(request: LoginRequest): Promise<TokenResponse>;
  register(request: RegisterRequest): Promise<boolean>;
}
