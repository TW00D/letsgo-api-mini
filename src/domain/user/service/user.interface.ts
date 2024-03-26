import { User } from '../domain/user.model';
import { UpdateRequest } from '../presentation/dto/\bupdate.dto';
import { ChangePasswordRequest } from '../presentation/dto/password-update.dto';
export interface UserInterface {
  readAll(): Promise<User[]>;
  read(username: string): Promise<User>;
  update(username: string, request: UpdateRequest): Promise<boolean>;
  changePassword(
    username: string,
    request: ChangePasswordRequest,
  ): Promise<boolean>;
  delete(username: string, password: string): Promise<boolean>;
}
