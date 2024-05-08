import * as React from 'react';
import { cellStyle } from './desktopTodoItem.styles';
import TodoButtonGroup from '~shared/components/todoButtonGroup/todoButtonGroup.component';
import UpdateButton from '~shared/components/updateButton/updateButton.component';

const DesktopTodoItem = ({ todo }): React.ReactNode => {
	return (
		<tr>
			<td css={cellStyle}>{todo.title}</td>
			<td css={cellStyle}>{todo.description}</td>
			<td css={cellStyle}>
				<UpdateButton todoId={todo.id} todoData={todo} />
				<TodoButtonGroup todo={todo}></TodoButtonGroup>
			</td>
		</tr>
	);
};

export default DesktopTodoItem;
