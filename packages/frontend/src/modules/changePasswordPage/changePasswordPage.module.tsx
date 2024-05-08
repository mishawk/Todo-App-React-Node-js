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
	pageStyles,
} from './changePasswordPage.styles';
import { ROUTER_KEYS } from '~shared/keys';
import { validateEmail, validatePassword } from '~/utils/validationRules';
import { useState } from 'react';
import Loader from '~shared/components/loader/loader.component';

const ChangePasswordPage = (): React.ReactNode => {
	const navigate = useNavigate();
	const { changeUserPassword } = useUserStore();
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (values): Promise<void> => {
		const { email, password, newPassword } = values;

		try {
			setIsLoading(true);
			await changeUserPassword(email, password, newPassword);
			navigate('/');
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
			) : (
				<Card
					interactive={true}
					elevation={Elevation.TWO}
					css={cardStyles}
				>
					<H2>Change password</H2>

					{isLoading ? (
						<Loader />
					) : (
						<Form onSubmit={onSubmit} css={formStyles}>
							{({ handleSubmit }) => (
								<form onSubmit={handleSubmit}>
									<FormGroup
										label="Email"
										labelFor="email-input"
									>
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
													{meta.error &&
														meta.touched && (
															<span
																css={errorStyle}
															>
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
													{meta.error &&
														meta.touched && (
															<span
																css={errorStyle}
															>
																{meta.error}
															</span>
														)}
												</div>
											)}
										/>
									</FormGroup>

									<FormGroup
										label="New password"
										labelFor="new-password-input"
									>
										<Field
											validate={validatePassword}
											name="newPassword"
											render={({ input, meta }) => (
												<div>
													<InputGroup
														{...input}
														id="new-password-input"
														placeholder="Password"
														type="password"
													/>
													{meta.error &&
														meta.touched && (
															<span
																css={errorStyle}
															>
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

										<Button type="submit">
											Change Password
										</Button>
									</div>
								</form>
							)}
						</Form>
					)}
				</Card>
			)}
		</div>
	);
};

export default ChangePasswordPage;
