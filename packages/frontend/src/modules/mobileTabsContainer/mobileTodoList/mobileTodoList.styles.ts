import { css } from '@emotion/react';
import { colors } from '~shared/styles';

export const noTodosMessage = css`
	text-align: center;
	margin-top: 20px;
	font-size: 18px;
	color: ${colors.noTodosMessageColor};
`;

export const loaderContainerStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 500px;
`;
