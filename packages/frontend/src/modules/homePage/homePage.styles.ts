import { css } from '@emotion/react';
import { colors } from '~shared/styles';

export const containerStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const cardStyle = css`
	height: 70%;
	width: 60%;
	padding: 2rem;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
export const appNameStyle = css`
	margin-bottom: 10px;
	font-size: 2rem;
`;

export const buttonContainerStyle = css`
	display: flex;
	flex-direction: column;
	margin-top: 3rem;
`;
export const buttonStyle = css`
	margin: 0 auto 2rem auto;
	height: 50px;
	width: 150px;
`;

export const forgotPasswordStyle = css`
	color: ${colors.forgotPasswordColor};
`;
