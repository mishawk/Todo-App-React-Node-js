import { Form, Field } from 'react-final-form';
import {
	Button,
	FormGroup,
	InputGroup,
	Card,
	Elevation,
	H2,
	H5,
} from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { validateEmail } from '~/utils/validationRules';
import { useState } from 'react';
import Loader from '~shared/components/loader/loader.component';
import {
	buttonContainerStyle,
	cardStyles,
	errorStyle,
	formStyles,
	pageStyles,
} from './forgotPasswordPage.styles';
import { UserService } from '~shared/services/userService';
import { HttpService } from '~shared/services/httpService';

const ForgotPasswordPage = (): React.ReactNode => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const onSubmit = async (values): Promise<void> => {
		const { email } = values;

		try {
			setIsLoading(true);

			const userService = new UserService(
				new HttpService(`${process.env.SERVER_URL}/users`),
			);
			await userService.forgotUserPassword(email);
			setIsSuccess(true);
		} catch (error) {
			console.log('Process failed');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div css={pageStyles}>
			{isLoading ? (
				<Loader />
			) : isSuccess ? (
				<Card interactive={true} elevation={Elevation.TWO}>
					<H5>Verification</H5>
					<p>
						A new password has been sent to your email. Please check
						your inbox.
					</p>

					<Link to={ROUTER_KEYS.HOME}>
						<Button>Go Back</Button>
					</Link>
				</Card>
			) : (
				<Card
					interactive={true}
					elevation={Elevation.TWO}
					css={cardStyles}
				>
					<H2>Forgot password</H2>

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

								<div css={buttonContainerStyle}>
									<Link to={ROUTER_KEYS.HOME}>
										<Button>Go Back</Button>
									</Link>

									<Button type="submit">Submit</Button>
								</div>
							</form>
						)}
					</Form>
				</Card>
			)}
		</div>
	);
};

export default ForgotPasswordPage;
