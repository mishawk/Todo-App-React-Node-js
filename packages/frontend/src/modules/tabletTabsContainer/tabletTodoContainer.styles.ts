import { css } from '@emotion/react';

export const containerStyles = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

export const rowStyles = css`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	max-width: 768px;
	padding: 0 15px;
	margin-bottom: 20px;
`;

export const inputContainerStyles = css`
	margin-left: auto;
	margin-right: 10px;
	width: 150px;
`;

export const buttonContainer = css`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 30px;
`;
