import { UpdateUserDto } from '~typings/userType';

export interface IUserService {
	login(email: string, password: string): Promise<number>;
	updateUser(id: number, updateData: UpdateUserDto): Promise<void>;
}
