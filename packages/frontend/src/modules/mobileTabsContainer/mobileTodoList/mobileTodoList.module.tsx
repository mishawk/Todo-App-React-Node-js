import * as React from 'react';
import MobileTodoCard from '../mobileTodoCard/mobileTodoCard.module';
import { noTodosMessage } from './mobileTodoList.styles';
import { useTodoStore } from '~store/todo.store';
import MobilePagination from '../mobilePagination/mobilePagination';
import Loader from '~shared/components/loader/loader.component';

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
	isLoading,
}) => {
	const { todos } = useTodoStore();

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
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
			)}
		</>
	);
};

export default MobileTodoList;
