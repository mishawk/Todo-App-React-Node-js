import { FilterType } from '~typings/filterType';

export const tabs = [
	{ id: 'all', title: 'All', filterType: FilterType.All },
	{ id: 'private', title: 'Private', filterType: FilterType.Private },
	{ id: 'public', title: 'Public', filterType: FilterType.Public },
	{
		id: 'completed',
		title: 'Completed',
		filterType: FilterType.Completed,
	},
];
