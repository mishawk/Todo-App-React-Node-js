import { css } from '@emotion/react';
import { colors } from '~shared/styles';

export const buttonStyles = css`
	background-color: ${colors.buttonBackground};
	color: ${colors.buttonColor};
	border: none;
	padding: 5px 20px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 4px 2px;
	cursor: pointer;
	border-radius: 4px;
	&:hover {
		background-color: ${colors.buttonBackgroundOnHover};
	}
`;

export const dialogStyles = css`
	width: 90%;
	max-width: 800px;
	height: auto;
	max-height: 90vh;
	padding: 20px;
	background-color: ${colors.dialogColor};
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const formGroupStyles = css`
	margin-bottom: 15px;

	label {
		font-weight: bold;
		display: block;
		margin-bottom: 5px;
	}
	input[type='text'],
	textarea {
		width: 100%;
		padding: 18px;
		border: 1px solid ${colors.borderColor};
		border-radius: 4px;
		box-sizing: border-box;
	}
`;

export const textAreaStyles = css`
	width: 100%;
	height: 150px;
	padding: 8px;
	border: 1px solid ${colors.borderColor};
	border-radius: 4px;
	box-sizing: border-box;
	resize: vertical;
	font-size: 14px;
	line-height: 1.5;
`;
