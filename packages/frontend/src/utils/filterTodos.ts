import { FilterType } from '~typings/filterType';
import { Todo, Status } from '~typings/todo';

export const filterTodos = (
	filterType: FilterType,
	todos: Todo[],
	input?: string,
): Todo[] => {
	return todos.filter((todo) => {
		switch (filterType) {
			case 'all':
				return todo.title.includes(input);
			case 'private':
				return !todo.isPublic && todo.title.includes(input);
			case 'public':
				return todo.isPublic && todo.title.includes(input);
			case 'completed':
				return (
					todo.status === Status.completed &&
					todo.title.includes(input)
				);
			default:
				return true;
		}
	});
};
