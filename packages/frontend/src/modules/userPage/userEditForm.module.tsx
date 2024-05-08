import { Field, Form } from 'react-final-form';
import {
	buttonContainer,
	buttonStyles,
	formStyles,
	inputStyles,
} from './userPage.styles';
import { Button, InputGroup } from '@blueprintjs/core';

export const UserEditForm = ({ user, onSubmit }): React.ReactNode => (
	<Form
		css={formStyles}
		onSubmit={onSubmit}
		initialValues={user}
		render={({ handleSubmit, form, submitting, pristine }) => (
			<form onSubmit={handleSubmit}>
				<Field name="firstName">
					{({ input, meta }) => (
						<div>
							<label>First Name</label>
							<InputGroup
								css={inputStyles}
								{...input}
								type="text"
								placeholder="First Name"
							/>
							{meta.touched && meta.error && (
								<span>{meta.error}</span>
							)}
						</div>
					)}
				</Field>

				<Field name="lastName">
					{({ input, meta }) => (
						<div>
							<label>Last Name</label>
							<InputGroup
								css={inputStyles}
								{...input}
								type="text"
								placeholder="Last Name"
							/>
							{meta.touched && meta.error && (
								<span>{meta.error}</span>
							)}
						</div>
					)}
				</Field>

				<div css={buttonContainer}>
					<Button
						css={buttonStyles}
						type="submit"
						disabled={submitting || pristine}
					>
						Update
					</Button>

					<Button
						type="button"
						css={buttonStyles}
						onClick={form.reset}
						disabled={submitting || pristine}
					>
						Reset
					</Button>
				</div>
			</form>
		)}
	/>
);

export default UserEditForm;
