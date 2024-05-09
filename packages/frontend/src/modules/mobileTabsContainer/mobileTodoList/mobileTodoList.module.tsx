import * as React from 'react';
import MobileTodoCard from '../mobileTodoCard/mobileTodoCard.module';
import { noTodosMessage } from './mobileTodoList.styles';
import { useTodoStore } from '~store/todo.store';
import MobilePagination from '../mobilePagination/mobilePagination';

interface Props {
	handlePageChange: (selectedItem: unknown) => void;
	pageCount: number;
	currentPage: number;
	isLoading: boolean;
}

const MobileTodoList: React.FC<Props> = ({
	handlePageChange,
	pageCount,
	currentPage,
}) => {
	const { todos } = useTodoStore();

	return (
		<>
			<div>
				{todos.length > 0 ? (
					todos.map((todo) => (
						<MobileTodoCard key={todo.id} todo={todo} />
					))
				) : (
					<p css={noTodosMessage}>No todos to display</p>
				)}

				{todos.length > 0 && (
					<MobilePagination
						handlePageChange={handlePageChange}
						pageCount={pageCount}
						currentPage={currentPage}
					/>
				)}
			</div>
		</>
	);
};

export default MobileTodoList;
