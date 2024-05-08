import { Button, ButtonGroup, Icon } from '@blueprintjs/core';
import { Children, ReactNode, isValidElement } from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { useTodoStore } from '~store/todo.store';
import { Status, Todo } from '~typings/todo';
import { viewButtonStyles } from './todoButtonGroup.styles';
import { MOBILE_ITEMS_PER_PAGE } from '~typings/constants';

interface ButtonGroupProps {
	todo: Todo;
	children?: ReactNode;
}

const TodoButtonGroup: React.FC<ButtonGroupProps> = ({ todo, children }) => {
	const { deleteTodo, updateTodo, getTodoById, getAllTodos } = useTodoStore();

	const toggleStatus = async (
		id: number,
		currentStatus: Status,
	): Promise<void> => {
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

	return (
		<ButtonGroup minimal={true}>
			{children &&
				Children.map(children, (child) =>
					isValidElement(child) ? child : null,
				)}

			<Link to={`${ROUTER_KEYS.TODO_DETAILS}=${+todo.id}`}>
				<Button
					css={viewButtonStyles}
					intent="success"
					icon={<Icon icon="eye-open" />}
					onClick={() => getTodoById(+todo.id)}
				>
					View
				</Button>
			</Link>

			<Button
				intent="danger"
				icon={<Icon icon="trash" />}
				onClick={() => deleteTodo(todo.id)}
			>
				Delete
			</Button>

			<Button
				intent={todo.status === Status.completed ? 'success' : 'none'}
				icon={<Icon icon="tick-circle" />}
				onClick={() => toggleStatus(todo.id, todo.status)}
			></Button>
		</ButtonGroup>
	);
};

export default TodoButtonGroup;
