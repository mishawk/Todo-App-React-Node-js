import { css } from '@emotion/react';
import { colors } from '~shared/styles';

export const registerPageStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const cardStyles = css`
	width: 90%;
	max-width: 600px;
`;

export const formStyles = css`
	margin-bottom: 20px;
`;

export const calloutStyles = css`
	margin: 10px 0;
`;

export const errorStyle = css`
	color: ${colors.errorStyleColor};
	margin-top: 0.5rem;
`;

export const buttonContainerStyle = css`
	display: flex;
	justify-content: space-between;
`;
