import * as React from 'react';
import { InputGroup, Tab, Tabs } from '@blueprintjs/core';
import {
	mobileInputStyles,
	mobileTabsContainerStyles,
	tabsContainerStyles,
} from './mobileTabsContainer.styles';
import MobileTodoList from './mobileTodoList/mobileTodoList.module';
import { tabs } from '~/utils/tabsContainer';
import CreateButton from '~shared/components/createButton/createButton.component';
import { Field, Form } from 'react-final-form';
import { useFilteredPaginatedTodos } from '~/hooks/useFilteredPaginatedTodos';
import { MOBILE_ITEMS_PER_PAGE } from '~typings/constants';
import useDebounce from '~/hooks/useDebounce';
import { useEffect } from 'react';
import Loader from '~shared/components/loader/loader.component';
import { loaderContainerStyles } from './mobileTodoList/mobileTodoList.styles';

const MobileTabsContainer = (): React.ReactNode => {
	const {
		input,
		setInput,
		selectedTab,
		setSelectedTab,
		currentPage,
		fetchFilteredTodos,
		pageCount,
		setCurrentPage,
		isLoading,
	} = useFilteredPaginatedTodos(MOBILE_ITEMS_PER_PAGE);

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
							<div css={mobileTabsContainerStyles}>
								<div css={mobileInputStyles}>
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

								<CreateButton />

								<Tabs
									id="Tabs"
									css={tabsContainerStyles}
									onChange={handleTabChange}
								>
									{tabs.map((tab) => (
										<Tab
											key={tab.id}
											id={tab.id}
											title={tab.title}
											panel={
												isFetching ? (
													<div
														css={
															loaderContainerStyles
														}
													>
														<Loader />
													</div>
												) : (
													<MobileTodoList
														handlePageChange={
															handlePageChange
														}
														pageCount={pageCount}
														currentPage={
															currentPage
														}
														isLoading={isLoading}
													/>
												)
											}
										/>
									))}
								</Tabs>
							</div>
						</>
					</form>
				)}
			/>
		</>
	);
};

export default MobileTabsContainer;
