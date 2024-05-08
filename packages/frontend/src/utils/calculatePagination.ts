export function calculatePagination<T>(
	array: T[],
	currentPage: number,
	itemsPerPage: number,
): {
	totalPages: number;
	visibleElements: T[];
} {
	const totalPages = Math.ceil(array.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, array.length);
	const visibleElements = array.slice(startIndex, endIndex);

	return { totalPages, visibleElements };
}
