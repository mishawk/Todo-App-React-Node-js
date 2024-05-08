import { EMAIL_REGEX } from './Regex';

export const validateEmail = (value): string | undefined => {
	const regex = EMAIL_REGEX;
	if (!value) {
		return 'Email is required';
	} else if (!regex.test(value)) {
		return 'Invalid email address';
	}
};

export const validatePassword = (value): string | undefined => {
	if (!value) {
		return 'Password is required';
	} else if (value.length < 8) {
		return 'Password must be at least 8 characters long';
	}
};

export const validateName = (value): string | undefined => {
	if (!value) {
		return 'Field is required';
	} else if (value.length < 2) {
		return 'Field must be at least 2 characters long';
	}
};
