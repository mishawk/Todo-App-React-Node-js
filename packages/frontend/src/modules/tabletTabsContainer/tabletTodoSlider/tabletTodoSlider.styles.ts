import { css } from '@emotion/react';
import { colors } from '~shared/styles';

export const rightArrowStyles = css`
	position: absolute;
	width: 40px;
	height: 40px;
	background: ${colors.arrowIconColor};
	border: 1px solid ☐ ${colors.arrowIconColorBorder};
	cursor: pointer;
	border-radius: 50%;
	padding: 5px;
	transition: all 0.3s ease-in-out;
	z-index: 10;
	right: -50px;
	top: 40%;
	display: flex;
	justify-content: center;
	align-items: center;

	&:active {
		background: ${colors.arrowIconColorActive};
		transition: background 0.3s ease-in-out;
	}
`;

export const leftArrowStyles = css`
	position: absolute;
	width: 40px;
	height: 40px;
	cursor: pointer;
	border-radius: 50%;
	background: ${colors.arrowIconColor};
	border: 1px solid ☐ ${colors.arrowIconColorBorder};
	padding: 5px;
	transition: all 0.3s ease-in-out;
	z-index: 10;
	left: -50px;
	top: 40%;
	display: flex;
	justify-content: center;
	align-items: center;

	&:active {
		background: ${colors.arrowIconColorActive};
		transition: background 0.3s ease-in-out;
	}
`;

export const noTodosMessage = css`
	margin: auto;
	text-align: center;
`;

export const sliderStyles = css`
	width: 70%;
	margin-top: 2%;
	margin-bottom: 2%;
	height: 350px;
	position: relative;
`;

export const cardStyles = css`
	width: 100%;
	height: 310px;
	padding: 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const buttonGroupStyles = css`
	display: flex;
	justify-content: center;
	width: 100%;
	height: auto;
	margin-left: 10px;
	margin-top: 15px;
`;

export const buttonStyles = css`
	flex-grow: 1;
	margin: 0 10px;
`;

export const viewButtonStyles = css`
	flex-grow: 1;
	margin: 10px 8px;
`;

export const cardDescription = css`
	word-wrap: break-word;
`;

export const tagContainerStyles = css`
	text-align: center;
	margin-top: 20px;
`;
