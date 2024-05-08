import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import {
	Button,
	FormGroup,
	InputGroup,
	Card,
	Elevation,
	Callout,
	Intent,
	H2,
} from '@blueprintjs/core';
import { useUserStore } from '~store/users.store';
import { Link, useNavigate } from 'react-router-dom';
import {
	buttonContainerStyle,
	calloutStyles,
	cardStyles,
	formStyles,
	loginPageStyles,
} from './loginPage.styles';
import { ROUTER_KEYS } from '~shared/keys';
import Loader from '~shared/components/loader/loader.component';

const LoginPage = (): React.ReactNode => {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const login = useUserStore((state) => state.login);

	const doLogin = async (email: string, password: string): Promise<void> => {
		try {
			setIsLoading(true);
			const response = await login(email, password);

			if (response === 200) {
				navigate(ROUTER_KEYS.APP);
			} else {
				setError(
					'Password or email is wrong! Or please check your gmail to confirm verification!',
				);
			}
		} catch (error) {
			setError(error.message || 'Something went wrong');
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (values): Promise<void> => {
		await doLogin(values.email, values.password);
	};

	return (
		<div css={loginPageStyles}>
			{isLoading ? (
				<Loader />
			) : (
				<Card
					interactive={true}
					elevation={Elevation.TWO}
					css={cardStyles}
				>
					<H2>Log In</H2>

					<Form onSubmit={handleSubmit} css={formStyles}>
						{({ handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<FormGroup label="Email" labelFor="email-input">
									<Field
										name="email"
										render={({ input }) => (
											<InputGroup
												{...input}
												id="email-input"
												placeholder="Email..."
												type="email"
											/>
										)}
									/>
								</FormGroup>

								<FormGroup
									label="Password"
									labelFor="password-input"
								>
									<Field
										name="password"
										render={({ input }) => (
											<InputGroup
												{...input}
												id="password-input"
												placeholder="Password"
												type="password"
											/>
										)}
									/>
								</FormGroup>

								{error && (
									<Callout
										css={calloutStyles}
										intent={Intent.DANGER}
									>
										{error}
									</Callout>
								)}

								<div css={buttonContainerStyle}>
									<Link to={ROUTER_KEYS.HOME}>
										<Button>Go Back</Button>
									</Link>
									<Button type="submit">Log In</Button>
								</div>
							</form>
						)}
					</Form>
				</Card>
			)}
		</div>
	);
};

export default LoginPage;
