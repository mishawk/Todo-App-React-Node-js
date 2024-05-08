import { IUserService } from '~/interfaces/userService.interface';
import { HttpService } from './httpService';
import { UpdateUserDto, UserType } from '~typings/userType';
import { STORAGE_KEYS } from '~shared/keys';

export class UserService implements IUserService {
	private httpService: HttpService;

	constructor(httpService: HttpService) {
		this.httpService = httpService;
	}

	async getUserByEmail(email: string): Promise<UserType | null> {
		return await this.httpService.get(`/getUserByEmail/${email}`);
	}

	async getUserById(id: number): Promise<UserType | null> {
		return await this.httpService.get(`/getUser/${id}`);
	}

	async changeUserPassword(
		email: string,
		password: string,
		newPassword: string,
	): Promise<void> {
		return this.httpService.post('/changePassword', {
			email,
			password,
			newPassword,
		});
	}

	async forgotUserPassword(email: string): Promise<void> {
		return this.httpService.post('/forgotPassword', {
			email,
		});
	}

	async login(email: string, password: string): Promise<number> {
		try {
			const response = await this.httpService.post<{ token: string }>(
				'/login',
				{
					email,
					password,
				},
			);

			if (response.token) {
				localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
			}

			return 200;
		} catch (error) {
			console.error(error);
			return 401;
		}
	}

	async registerUser(
		email: string,
		password: string,
		firstName: string,
		lastName: string,
	): Promise<void> {
		await this.httpService.post('/register', {
			email,
			password,
			firstName,
			lastName,
		});
	}

	updateUser(id: number, updateData: UpdateUserDto): Promise<void> {
		const { email, password, firstName, lastName } = updateData;

		return this.httpService.put(`/updateUser/${id}`, {
			email,
			password,
			firstName,
			lastName,
		});
	}
}
