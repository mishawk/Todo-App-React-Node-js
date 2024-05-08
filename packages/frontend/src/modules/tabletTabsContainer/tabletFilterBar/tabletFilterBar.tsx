import { Tabs, Tab, InputGroup } from '@blueprintjs/core';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Field } from 'react-final-form';
import { rowStyles, inputContainerStyles } from '../tabletTodoContainer.styles';

export const TabletFilterBar = ({
	handleTabChange,
	handleInputChange,
	input,
}): EmotionJSX.Element => (
	<div css={rowStyles}>
		<Tabs id="Tabs" onChange={handleTabChange}>
			<Tab id="all" title="All" />
			<Tab id="private" title="Private" />
			<Tab id="public" title="Public" />
			<Tab id="completed" title="Completed" />
		</Tabs>
		<div css={inputContainerStyles}>
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
	</div>
);
