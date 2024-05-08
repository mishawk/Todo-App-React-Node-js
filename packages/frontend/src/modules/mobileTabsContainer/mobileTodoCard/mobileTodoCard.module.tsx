import * as React from 'react';
import {
	cardStyles,
	descriptionStyles,
	titleStyles,
} from './mobileTodoCard.styles';
import TodoButtonGroup from '~shared/components/todoButtonGroup/todoButtonGroup.component';
import { Card } from '@blueprintjs/core';
import UpdateButton from '~shared/components/updateButton/updateButton.component';

const MobileTodoCard = ({ todo }): React.ReactNode => {
	return (
		<Card interactive={true} elevation={2} css={cardStyles}>
			<h5 css={titleStyles}>{todo.title}</h5>
			<p css={descriptionStyles}>{todo.description}</p>

			<TodoButtonGroup todo={todo}>
				<UpdateButton todoId={todo.id} todoData={todo} />
			</TodoButtonGroup>
		</Card>
	);
};

export default MobileTodoCard;
