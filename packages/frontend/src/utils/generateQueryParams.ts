import { FilterType } from '~typings/filterType';
import { QueryParams } from '~typings/queryParams';
import { TabType } from '~typings/tabType';
import { Status } from '~typings/todo';

export const generateQueryParams = (tab: TabType): QueryParams => {
	switch (tab.filterType) {
		case FilterType.All:
			return {};
		case FilterType.Private:
			return { isPublic: false };
		case FilterType.Public:
			return { isPublic: true };
		case FilterType.Completed:
			return { status: Status.completed };
		default:
			return {};
	}
};
