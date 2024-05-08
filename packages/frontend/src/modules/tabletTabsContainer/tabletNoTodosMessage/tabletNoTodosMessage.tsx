import { Card, Elevation, H6 } from '@blueprintjs/core';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
	cardStyles,
	noTodosMessage,
} from '../tabletTodoSlider/tabletTodoSlider.styles';

export const NoTodosMessage = (): EmotionJSX.Element => (
	<Card css={cardStyles} interactive={true} elevation={Elevation.TWO}>
		<H6 css={noTodosMessage}>No todos found.</H6>
	</Card>
);
