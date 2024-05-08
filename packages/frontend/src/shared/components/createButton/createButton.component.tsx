import { useState } from 'react';
import {
	Button,
	Icon,
	Dialog,
	Classes,
	FormGroup,
	Intent,
	MenuItem,
	InputGroup,
	Checkbox,
	TextArea,
} from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { Form, Field } from 'react-final-form';
import { useTodoStore } from '~store/todo.store';
import { CreateTodoDto, Status } from '~typings/todo';
import {
	buttonStyles,
	dialogStyles,
	formGroupStyles,
	textAreaStyles,
} from './createButton.styles';

const validate = (values: CreateTodoDto): Partial<CreateTodoDto> => {
	const errors: Partial<CreateTodoDto> = {};
	if (!values.title) {
		errors.title = 'Title is required';
	}

	return errors;
};

const CreateButton: React.FC = () => {
	const { createTodo } = useTodoStore();
	const [isOpen, setIsOpen] = useState(false);

	const onSubmit = async (values: CreateTodoDto): Promise<void> => {
		await createTodo(values);
		setIsOpen(false);
	};

	return (
		<>
			<Button
				css={buttonStyles}
				onClick={() => setIsOpen(true)}
				icon={<Icon icon="add" />}
			>
				Create Todo
			</Button>

			<Dialog
				css={dialogStyles}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Create Todo"
			>
				<div className={Classes.DIALOG_BODY}>
					<Form
						initialValues={{
							isPublic: true,
						}}
						onSubmit={onSubmit}
						validate={validate}
						render={({ handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<Field name="title">
									{({ input, meta }) => (
										<FormGroup
											css={formGroupStyles}
											intent={
												meta.error && meta.touched
													? Intent.DANGER
													: Intent.NONE
											}
											helperText={
												meta.touched && meta.error
											}
										>
											<InputGroup
												{...input}
												type="text"
												placeholder="Enter title"
											/>
										</FormGroup>
									)}
								</Field>

								<Field name="description">
									{({ input, meta }) => (
										<FormGroup
											css={formGroupStyles}
											intent={
												meta.error && meta.touched
													? Intent.DANGER
													: Intent.NONE
											}
											helperText={
												meta.touched && meta.error
											}
										>
											<TextArea
												css={textAreaStyles}
												{...input}
												placeholder="Enter description"
											/>
										</FormGroup>
									)}
								</Field>

								<Field name="status">
									{({ input, meta }) => (
										<FormGroup
											css={formGroupStyles}
											intent={
												meta.error && meta.touched
													? Intent.DANGER
													: Intent.NONE
											}
											helperText={
												meta.touched && meta.error
											}
										>
											<Select
												{...input}
												items={Object.values(Status)}
												onItemSelect={(item) => {
													input.onChange(item);
												}}
												itemRenderer={(
													status,
													{ handleClick },
												) => {
													return (
														<MenuItem
															key={status}
															onClick={
																handleClick
															}
															text={status}
														/>
													);
												}}
											>
												<Button
													text={
														input.value ||
														'Choose status'
													}
													rightIcon="double-caret-vertical"
												/>
											</Select>
										</FormGroup>
									)}
								</Field>

								<Field name="isPublic" type="checkbox">
									{({ input }) => (
										<FormGroup css={formGroupStyles}>
											<Checkbox
												{...input}
												checked={input.value}
												defaultChecked={true}
												label="Is Public"
											/>
										</FormGroup>
									)}
								</Field>

								<Button
									css={buttonStyles}
									type="submit"
									icon={<Icon icon="add" />}
								>
									Create
								</Button>
							</form>
						)}
					/>
				</div>
			</Dialog>
		</>
	);
};

export default CreateButton;
