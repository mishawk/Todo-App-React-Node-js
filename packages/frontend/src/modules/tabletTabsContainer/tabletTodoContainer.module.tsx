import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTodoStore } from '~store/todo.store';
import { buttonContainer, containerStyles } from './tabletTodoContainer.styles';
import TabletTodoSlider from './tabletTodoSlider/tabletTodoSlider.module';
import CreateButton from '~shared/components/createButton/createButton.component';
import { tabs } from '~/utils/tabsContainer';
import { Form } from 'react-final-form';
import useDebounce from '~/hooks/useDebounce';
import Loader from '~shared/components/loader/loader.component';
import { MOBILE_ITEMS_PER_PAGE } from '~typings/constants';
import { fetchFilteredTodos } from '~/utils/fetchFilteredTodos';
import { TabletFilterBar } from './tabletFilterBar/tabletFilterBar';
import { Button } from '@blueprintjs/core';

const TabletTodoContainer = (): React.ReactNode => {
	const { todos, getAllTodos } = useTodoStore();
	const [input, setInput] = useState('');
	const [selectedTab, setSelectedTab] = useState(tabs[0]);
	const [isLoading, setIsLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [requestCounter, setRequestCounter] = useState(0);
	const [localCounter, setLocalCounter] = useState(0);

	const debouncedInput = useDebounce(input, 300);

	useEffect(() => {
		fetchFilteredTodos(
			getAllTodos,
			setIsLoading,
			debouncedInput,
			selectedTab,
			offset,
			MOBILE_ITEMS_PER_PAGE,
		);
	}, [debouncedInput, selectedTab, requestCounter, offset]);

	useEffect(() => {
		if (localCounter % MOBILE_ITEMS_PER_PAGE === 0 && localCounter > 0) {
			setRequestCounter(requestCounter + 1);
			setOffset((prev) => prev + MOBILE_ITEMS_PER_PAGE);
		}
	}, [localCounter]);

	useEffect(() => {
		if (todos.length === 0 && requestCounter > 0) {
			setOffset((prev) => prev - MOBILE_ITEMS_PER_PAGE);
			setRequestCounter((prev) => prev - 1);
		}
	}, [todos, requestCounter]);

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

	const handleSubmit = (): void => {
		fetchFilteredTodos(
			getAllTodos,
			setIsLoading,
			debouncedInput,
			selectedTab,
			offset,
			MOBILE_ITEMS_PER_PAGE,
		);
	};

	const handleReloadTodos = (): void => {
		getAllTodos({ offset: 0, limit: MOBILE_ITEMS_PER_PAGE });
	};

	return (
		<Form
			onSubmit={handleSubmit}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<div css={containerStyles}>
						<TabletFilterBar
							handleTabChange={handleTabChange}
							handleInputChange={handleInputChange}
							input={input}
						/>

						<div css={buttonContainer}>
							<CreateButton />

							<Button onClick={handleReloadTodos}>
								Reload Todos
							</Button>
						</div>

						<TabletTodoSlider
							setLocalCounter={setLocalCounter}
							localCounter={localCounter}
							requestCounter={requestCounter}
							setRequestCounter={setRequestCounter}
							setOffset={setOffset}
						/>
					</div>
				</form>
			)}
		/>
	);
};

export default TabletTodoContainer;
