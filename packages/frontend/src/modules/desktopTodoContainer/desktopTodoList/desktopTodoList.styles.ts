import { css } from '@emotion/react';
import { colors } from '~shared/styles';

export const cardStyles = css`
	height: 500px;
	width: 1040px;
`;

export const tableStyle = css`
	width: 1000px;
	margin: 0;
	border-collapse: collapse;
	table-layout: fixed;
`;

export const titleStyle = css`
	width: 200px;
	max-width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	border: 1px solid ${colors.borderColor};
`;

export const descriptionStyle = css`
	width: 300px;
	max-width: 400px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	border: 1px solid ${colors.borderColor};
`;

export const actionsStyle = css`
	width: 400px;
	max-width: 200px;
	text-align: center;
	border: 1px solid ${colors.borderColor};
`;

export const noTasksStyle = css`
	text-align: center;
`;

export const loaderContainerStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 500px;
`;
