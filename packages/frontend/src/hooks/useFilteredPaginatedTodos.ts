import { useEffect, useState } from 'react';
import { generateQueryParams } from '~/utils/generateQueryParams';
import { tabs } from '~/utils/tabsContainer';
import { HttpService } from '~shared/services/httpService';
import { TodoService } from '~shared/services/todoService';
import { useTodoStore } from '~store/todo.store';
import { TabType } from '~typings/tabType';

interface UsePaginatedTodosOutput {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	selectedTab: TabType;
	setSelectedTab: React.Dispatch<React.SetStateAction<TabType>>;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	pageCount: number;
	fetchFilteredTodos: (
		title: string,
		selectedTab: TabType,
		page: number,
	) => Promise<void>;
	isLoading: boolean;
}

export const useFilteredPaginatedTodos = (
	itemsPerPage: number,
): UsePaginatedTodosOutput => {
	const { todos, getAllTodos } = useTodoStore();
	const [input, setInput] = useState('');
	const [selectedTab, setSelectedTab] = useState(tabs[0]);
	const [currentPage, setCurrentPage] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const fetchFilteredTodos = async (
		title: string,
		selectedTab: TabType,
		page: number,
	): Promise<void> => {
		try {
			setIsLoading(true);
			const queryParams = generateQueryParams(selectedTab);
			queryParams.title = title;

			const todoService = new TodoService(
				new HttpService(
					`${process.env.SERVER_URL}/${process.env.BASE_ROUTE}`,
				),
			);

			const fetchFilteredTodos =
				await todoService.getAllTodos(queryParams);
			const filteredTodosLength = fetchFilteredTodos.length;

			queryParams.limit = itemsPerPage;
			queryParams.offset = page * itemsPerPage;

			getAllTodos(queryParams);
			const pageCount = Math.ceil(filteredTodosLength / itemsPerPage);
			setPageCount(pageCount);
		} catch (error) {
			console.error(
				'An error occurred while fetching filtered todos:',
				error,
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchFilteredTodos(input, selectedTab, currentPage);
	}, [selectedTab, currentPage, pageCount]);

	useEffect(() => {
		if (todos.length > itemsPerPage) {
			setCurrentPage(currentPage + 1);
		}
		if (todos.length === 0 && pageCount > 0 && currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}

		if (todos.length === 0 && currentPage === 0 && pageCount > 0) {
			fetchFilteredTodos(input, selectedTab, 0);
		}
	}, [todos]);

	return {
		input,
		setInput,
		selectedTab,
		setSelectedTab,
		currentPage,
		setCurrentPage,
		pageCount,
		fetchFilteredTodos,
		isLoading,
	};
};
