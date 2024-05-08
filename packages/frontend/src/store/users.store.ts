import create from 'zustand';
import { STORAGE_KEYS } from '~shared/keys';
import { HttpService } from '~shared/services/httpService';
import { UserService } from '~shared/services/userService';
import { UpdateUserDto, UserDto } from '~typings/userType';

interface IUserStore {
	user: UserDto;
	register(email, password, firstName, lastName): Promise<void>;
	login(email, password): Promise<number>;
	updateUser(id: number, updateData: UpdateUserDto): Promise<void>;
	changeUserPassword(
		email: string,
		password: string,
		newPassword: string,
	): Promise<void>;
	logout(): void;
}

const userService = new UserService(
	new HttpService(`${process.env.SERVER_URL}/users`),
);

export const useUserStore = create<IUserStore>((set) => ({
	user: null,
	register: async (
		email: string,
		password: string,
		firstName: string,
		lastName: string,
	): Promise<void> => {
		try {
			await userService.registerUser(
				email,
				password,
				firstName,
				lastName,
			);
		} catch (error) {
			console.error(error);
		}
	},
	login: async (email, password): Promise<number> => {
		try {
			const codeResponse = await userService.login(email, password);

			if (codeResponse === 200) {
				const user = await userService.getUserByEmail(email);
				set({ user });
				return 200;
			}

			return 401;
		} catch (error) {
			console.error(error);
		}
	},

	updateUser: async (
		id: number,
		updateData: UpdateUserDto,
	): Promise<void> => {
		await userService.updateUser(id, updateData);
		const updatedUser = await userService.getUserById(id);
		set({ user: updatedUser });
	},

	changeUserPassword: async (
		email: string,
		password: string,
		newPassword: string,
	): Promise<void> => {
		await userService.changeUserPassword(email, password, newPassword);
		const updatedUser = await userService.getUserByEmail(email);
		set({ user: updatedUser });
	},

	logout: (): void => {
		localStorage.removeItem(STORAGE_KEYS.TOKEN);
		set({ user: null });
	},
}));
