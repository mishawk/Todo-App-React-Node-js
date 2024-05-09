import * as React from 'react';
import { Card, Elevation, HTMLTable } from '@blueprintjs/core';
import {
	tableStyle,
	titleStyle,
	descriptionStyle,
	actionsStyle,
	noTasksStyle,
	cardStyles,
	loaderContainerStyles,
} from './desktopTodoList.styles';
import DesktopTodoItem from '../desktopTodoItem/desktopTodoItem';
import { useTodoStore } from '~store/todo.store';
import DesktopPagination from '../desktopPagination/desktopPagination';
import Loader from '~shared/components/loader/loader.component';

interface Props {
	handlePageChange: (selectedItem: unknown) => void;
	pageCount: number;
	currentPage: number;
	isFetching: boolean;
}

const DesktopTodoList: React.FC<Props> = ({
	handlePageChange,
	pageCount,
	currentPage,
	isFetching,
}) => {
	const { todos } = useTodoStore();

	return (
		<>
			<Card interactive={true} elevation={Elevation.TWO} css={cardStyles}>
				{isFetching ? (
					<div css={loaderContainerStyles}>
						<Loader />
					</div>
				) : (
					<HTMLTable css={tableStyle}>
						<thead>
							<tr>
								<th css={titleStyle}>Title</th>
								<th css={descriptionStyle}>Description</th>
								<th css={actionsStyle}>Actions</th>
							</tr>
						</thead>

						<tbody>
							{todos.length > 0 ? (
								todos.map((todo) => (
									<DesktopTodoItem
										key={todo.id}
										todo={todo}
									/>
								))
							) : (
								<tr>
									<td colSpan={3} css={noTasksStyle}>
										There are no tasks!
									</td>
								</tr>
							)}
						</tbody>
					</HTMLTable>
				)}

				{todos.length > 0 && (
					<DesktopPagination
						handlePageChange={handlePageChange}
						pageCount={pageCount}
						currentPage={currentPage}
					/>
				)}
			</Card>
		</>
	);
};

export default DesktopTodoList;
