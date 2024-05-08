import {
	Card,
	Elevation,
	H6,
	ButtonGroup,
	Button,
	Icon,
} from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import UpdateButton from '~shared/components/updateButton/updateButton.component';
import { ROUTER_KEYS } from '~shared/keys';
import {
	cardStyles,
	cardDescription,
	buttonGroupStyles,
	buttonStyles,
	viewButtonStyles,
} from '../tabletTodoSlider/tabletTodoSlider.styles';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export const TodoCard = ({
	todo,
	handleToggleStatus,
	handleDeleteTodo,
	getTodoById,
}): EmotionJSX.Element => (
	<Card css={cardStyles} interactive={true} elevation={Elevation.TWO}>
		<H6>{todo.title}</H6>
		<p css={cardDescription}>{todo.description}</p>
		<ButtonGroup css={buttonGroupStyles} minimal={true} fill={true}>
			<Button
				css={buttonStyles}
				intent={todo.status === 'completed' ? 'success' : 'none'}
				icon={<Icon icon="tick-circle" />}
				onClick={() => handleToggleStatus(todo.id, todo.status)}
			>
				Complete
			</Button>

			<Link to={`${ROUTER_KEYS.TODO_DETAILS}=${+todo.id}`}>
				<Button
					css={viewButtonStyles}
					intent="success"
					icon={<Icon icon="eye-open" />}
					onClick={() => getTodoById(todo.id)}
				>
					View
				</Button>
			</Link>

			<Button
				css={buttonStyles}
				intent="danger"
				icon={<Icon icon="trash" />}
				onClick={() => handleDeleteTodo(todo.id)}
			>
				Delete
			</Button>
			<UpdateButton todoId={todo.id} todoData={todo} />
		</ButtonGroup>
	</Card>
);
