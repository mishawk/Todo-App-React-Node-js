import * as React from 'react';
import { InputGroup, Tab, Tabs } from '@blueprintjs/core';
import {
	desktopTabsContainerStyles,
	inputStyles,
} from './desktopTabsContainer.styles';
import DesktopTodoList from './desktopTodoList/desktopTodoList.module';
import { tabs } from '~/utils/tabsContainer';
import CreateButton from '~shared/components/createButton/createButton.component';
import { Field, Form } from 'react-final-form';
import { useFilteredPaginatedTodos } from '~/hooks/useFilteredPaginatedTodos';
import { DESKTOP_ITEMS_PER_PAGE } from '~typings/constants';
import { useEffect } from 'react';
import useDebounce from '~/hooks/useDebounce';

const DesktopTodoContainer = (): React.ReactNode => {
	const {
		input,
		setInput,
		selectedTab,
		setSelectedTab,
		currentPage,
		fetchFilteredTodos,
		pageCount,
		setCurrentPage,
	} = useFilteredPaginatedTodos(DESKTOP_ITEMS_PER_PAGE);

	const debouncedInput = useDebounce(input, 300);
	const [isFetching, setIsFetching] = React.useState(false);

	useEffect(() => {
		setIsFetching(true);
		fetchFilteredTodos(debouncedInput, selectedTab, currentPage).finally(
			() => setIsFetching(false),
		);
	}, [debouncedInput, selectedTab, currentPage]);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setInput(event.target.value);
	};

	const handleTabChange = (newTabId): void => {
		const newTab = tabs.find((tab) => tab.id === newTabId);
		if (newTab) {
			setSelectedTab(newTab);
		}
	};

	const handlePageChange = (selectedItem): void => {
		setCurrentPage(selectedItem.selected);
	};

	const handleSubmit = (): void => {
		fetchFilteredTodos(input, selectedTab, currentPage);
	};

	return (
		<>
			<Form
				onSubmit={handleSubmit}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<>
							<div css={desktopTabsContainerStyles}>
								<Tabs id="Tabs" onChange={handleTabChange}>
									{tabs.map((tab) => (
										<Tab
											key={tab.id}
											id={tab.id}
											title={tab.title}
											panel={
												<DesktopTodoList
													handlePageChange={
														handlePageChange
													}
													pageCount={pageCount}
													currentPage={currentPage}
													isFetching={isFetching}
												/>
											}
										/>
									))}

									<div>
										<CreateButton />
									</div>

									<div css={inputStyles}>
										<Field name="filter">
											{() => (
												<InputGroup
													value={input}
													onChange={handleInputChange}
													type="text"
													leftIcon="search"
													placeholder="Filter todos..."
												/>
											)}
										</Field>
									</div>
								</Tabs>
							</div>
						</>
					</form>
				)}
			/>
		</>
	);
};

export default DesktopTodoContainer;
