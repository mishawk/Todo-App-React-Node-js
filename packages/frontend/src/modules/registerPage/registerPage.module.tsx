import { Form, Field } from 'react-final-form';
import {
	Button,
	FormGroup,
	InputGroup,
	Card,
	Elevation,
	H2,
} from '@blueprintjs/core';
import { useUserStore } from '~store/users.store';
import { Link, useNavigate } from 'react-router-dom';
import {
	buttonContainerStyle,
	cardStyles,
	errorStyle,
	formStyles,
	registerPageStyles,
} from './registerPage.styles';
import { ROUTER_KEYS } from '~shared/keys';
import {
	validateEmail,
	validateName,
	validatePassword,
} from '~/utils/validationRules';
import { useState } from 'react';
import Loader from '~shared/components/loader/loader.component';

const RegisterPage = (): React.ReactNode => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const { register } = useUserStore();

	const onSubmit = async (values): Promise<void> => {
		const { email, password, firstName, lastName } = values;

		try {
			setIsLoading(true);
			await register(email, password, firstName, lastName);
			navigate(ROUTER_KEYS.VERIFICATION);
		} catch (error) {
			console.log('Registration failed');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div css={registerPageStyles}>
			<Card interactive={true} elevation={Elevation.TWO} css={cardStyles}>
				<H2>Register</H2>

				{isLoading ? (
					<Loader />
				) : (
					<Form onSubmit={onSubmit} css={formStyles}>
						{({ handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<FormGroup label="Email" labelFor="email-input">
									<Field
										name="email"
										validate={validateEmail}
										render={({ input, meta }) => (
											<div>
												<InputGroup
													{...input}
													id="email-input"
													placeholder="Email..."
													type="email"
												/>
												{meta.error && meta.touched && (
													<span css={errorStyle}>
														{meta.error}
													</span>
												)}
											</div>
										)}
									/>
								</FormGroup>

								<FormGroup
									label="Password"
									labelFor="password-input"
								>
									<Field
										validate={validatePassword}
										name="password"
										render={({ input, meta }) => (
											<div>
												<InputGroup
													{...input}
													id="password-input"
													placeholder="Password"
													type="password"
												/>
												{meta.error && meta.touched && (
													<span css={errorStyle}>
														{meta.error}
													</span>
												)}
											</div>
										)}
									/>
								</FormGroup>

								<FormGroup
									label="First Name"
									labelFor="firstName-input"
								>
									<Field
										name="firstName"
										validate={validateName}
										render={({ input, meta }) => (
											<div>
												<InputGroup
													{...input}
													id="firstName-input"
													placeholder="First Name..."
													type="text"
												/>
												{meta.error && meta.touched && (
													<span css={errorStyle}>
														{meta.error}
													</span>
												)}
											</div>
										)}
									/>
								</FormGroup>

								<FormGroup
									label="Last Name"
									labelFor="lastName-input"
								>
									<Field
										name="lastName"
										validate={validateName}
										render={({ input, meta }) => (
											<div>
												<InputGroup
													{...input}
													id="lastName-input"
													placeholder="Last Name..."
													type="text"
												/>
												{meta.error && meta.touched && (
													<span css={errorStyle}>
														{meta.error}
													</span>
												)}
											</div>
										)}
									/>
								</FormGroup>

								<div css={buttonContainerStyle}>
									<Link to={ROUTER_KEYS.HOME}>
										<Button>Go Back</Button>
									</Link>

									<Button type="submit">Register</Button>
								</div>
							</form>
						)}
					</Form>
				)}
			</Card>
		</div>
	);
};

export default RegisterPage;
