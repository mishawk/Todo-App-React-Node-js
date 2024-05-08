import * as React from 'react';
import { Card, Tag } from '@blueprintjs/core';
import { sliderStyles, tagContainerStyles } from './tabletTodoSlider.styles';
import { Status } from '~typings/todo';
import { useTodoStore } from '~store/todo.store';
import { useEffect } from 'react';
import { MOBILE_ITEMS_PER_PAGE } from '~typings/constants';
import { NoTodosMessage } from '../tabletNoTodosMessage/tabletNoTodosMessage';
import { TodoSlider } from '../todoSlider/todoSlider';

const TabletTodoSlider = ({
	setLocalCounter,
	localCounter,
	requestCounter,
	setRequestCounter,
	setOffset,
}): React.ReactNode => {
	const { deleteTodo, updateTodo, getTodoById, getAllTodos } = useTodoStore();
	const { todos } = useTodoStore();
	const length = todos.length;

	useEffect(() => {
		setLocalCounter(0);
	}, [todos]);

	const nextSlide = (): void => {
		setLocalCounter((prevLocalCounter) => {
			if (
				todos.length !== MOBILE_ITEMS_PER_PAGE &&
				prevLocalCounter + 1 === todos.length
			) {
				return 0;
			} else {
				return prevLocalCounter + 1;
			}
		});
	};

	const prevSlide = (): void => {
		if (localCounter === 0 && requestCounter > 0) {
			setRequestCounter(requestCounter - 1);
			setOffset((prev) => prev - MOBILE_ITEMS_PER_PAGE);
		} else {
			setLocalCounter(localCounter === 0 ? length - 1 : localCounter - 1);
		}
	};

	const handleToggleStatus = async (id, currentStatus): Promise<void> => {
		const newStatus =
			currentStatus === Status.completed
				? Status.inProgress
				: Status.completed;
		await updateTodo(id, { status: newStatus });
		await getAllTodos({
			offset: 0,
			limit: MOBILE_ITEMS_PER_PAGE,
			status: Status.completed,
		});
	};

	const handleDeleteTodo = (id): Promise<void> => {
		return deleteTodo(id);
	};

	return (
		<>
			<Card css={sliderStyles}>
				{todos.length > 0 ? (
					<TodoSlider
						todos={todos}
						localCounter={localCounter}
						nextSlide={nextSlide}
						prevSlide={prevSlide}
						handleToggleStatus={handleToggleStatus}
						handleDeleteTodo={handleDeleteTodo}
						getTodoById={getTodoById}
					/>
				) : (
					<NoTodosMessage />
				)}
			</Card>

			<div css={tagContainerStyles}>
				<Tag large minimal>
					Page: {requestCounter + 1}
				</Tag>
			</div>
		</>
	);
};

export default TabletTodoSlider;
