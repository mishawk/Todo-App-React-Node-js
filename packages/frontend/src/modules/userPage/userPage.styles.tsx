import { css } from '@emotion/react';
import { colors } from '~shared/styles';

export const editButton = css`
	margin-bottom: 10px;
`;

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

export const formStyles = css`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const buttonContainer = css`
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const inputStyles = css`
	margin: 10px 0;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid ${colors.borderColor};
`;

export const buttonStyles = css`
	margin-top: 20px;
	padding: 10px 20px;
	background-color: ${colors.buttonGreyBackround};
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;

	&:disabled {
		background-color: ${colors.borderColor};
	}
`;
