import { css } from '@emotion/react';
import { colors } from '~shared/styles';

export const pageStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const cardStyles = css`
	width: 90%;
	max-width: 600px;
	padding: 20px;
	box-sizing: border-box;
	margin: 0 auto;
	width: 100%;
`;

export const h1Styles = css`
	text-align: center;
`;

export const pStyles = css`
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid ${colors.borderColor};
	padding: 3px 0;
	&:last-child {
		border-bottom: none;
	}
	margin-bottom: 15px;
`;

export const h5Styles = css`
	font-weight: bold;
	order: 1;
`;

export const textStyle = css`
	order: 2;
	word-wrap: break-word;
`;

export const goBackButton = css`
	margin-top: 20px;
`;
