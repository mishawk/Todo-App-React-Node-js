import { generateQueryParams } from './generateQueryParams';

export const fetchFilteredTodos = async (
	getAllTodos,
	setIsLoading,
	title,
	selectedTab,
	offset,
	limit,
): Promise<void> => {
	setIsLoading(true);
	const queryParams = generateQueryParams(selectedTab);
	queryParams.title = title;
	queryParams.offset = offset;
	queryParams.limit = limit;

	await getAllTodos(queryParams);
	setIsLoading(false);
};
