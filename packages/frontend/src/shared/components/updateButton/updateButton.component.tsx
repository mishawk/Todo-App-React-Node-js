import { useState } from 'react';
import {
	Button,
	Icon,
	Dialog,
	Classes,
	FormGroup,
	Intent,
	InputGroup,
	Checkbox,
	TextArea,
	MenuItem,
} from '@blueprintjs/core';
import { Form, Field } from 'react-final-form';
import { useTodoStore } from '~store/todo.store';
import { Status, UpdateTodoDto } from '~typings/todo';
import {
	buttonStyles,
	dialogStyles,
	formGroupStyles,
} from './updateButton.styles';
import { Select } from '@blueprintjs/select';

const UpdateButton: React.FC<{ todoId: number; todoData: UpdateTodoDto }> = ({
	todoId,
	todoData,
}) => {
	const { updateTodo } = useTodoStore();
	const [isOpen, setIsOpen] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const onSubmit = async (values: UpdateTodoDto): Promise<void> => {
		try {
			await updateTodo(todoId, values);
			setIsOpen(false);
		} catch (error) {
			setSubmitError(error.message);
		}
	};

	return (
		<>
			<Button
				css={buttonStyles}
				onClick={() => setIsOpen(true)}
				icon={<Icon icon="edit" />}
				minimal={true}
			/>

			<Dialog
				css={dialogStyles}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Update Todo"
			>
				<div className={Classes.DIALOG_BODY}>
					<Form
						initialValues={todoData}
						onSubmit={onSubmit}
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
												style={{
													width: '100%',
													height: '150px',
													padding: '8px',
													border: '1px solid #ccc',
													borderRadius: '4px',
													boxSizing: 'border-box',
													resize: 'vertical',
													fontSize: '14px',
													lineHeight: '1.5',
												}}
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
													console.log(item);
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
												label="Is Public"
												checked={input.checked}
												onChange={input.onChange}
											/>
										</FormGroup>
									)}
								</Field>

								{submitError && (
									<div style={{ color: 'red' }}>
										{submitError}
									</div>
								)}

								<Button
									css={buttonStyles}
									type="submit"
									icon={<Icon icon="edit" />}
								>
									Update
								</Button>
							</form>
						)}
					/>
				</div>
			</Dialog>
		</>
	);
};

export default UpdateButton;
