import * as React from 'react';
import { Card, Elevation, HTMLTable } from '@blueprintjs/core';
import {
	tableStyle,
	titleStyle,
	descriptionStyle,
	actionsStyle,
	noTasksStyle,
	cardStyles,
} from './desktopTodoList.styles';
import DesktopTodoItem from '../desktopTodoItem/desktopTodoItem';
import { useTodoStore } from '~store/todo.store';
import DesktopPagination from '../desktopPagination/desktopPagination';
import Loader from '~shared/components/loader/loader.component';

interface Props {
	handlePageChange: (selectedItem: unknown) => void;
	pageCount: number;
	currentPage: number;
	isLoading: boolean;
}

const DesktopTodoList: React.FC<Props> = ({
	handlePageChange,
	pageCount,
	currentPage,
	isLoading,
}) => {
	const { todos } = useTodoStore();

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<Card
					interactive={true}
					elevation={Elevation.TWO}
					css={cardStyles}
				>
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

					{todos.length > 0 && (
						<DesktopPagination
							handlePageChange={handlePageChange}
							pageCount={pageCount}
							currentPage={currentPage}
						/>
					)}
				</Card>
			)}
		</>
	);
};

export default DesktopTodoList;
