import { css } from '@emotion/react';

export const paginationWrapperStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 0;
	margin-bottom: 10px;
`;

export const paginationLinkStyles = css`
	margin: 0 10px;
	padding: 5px 10px;
	text-decoration: none;
	color: white;
	background-color: #007bff;
	border-radius: 5px;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0056b3;
	}
`;

export const globalStyles = css`
	.pagination {
		margin: 0 2px;
		padding: 5px 10px;
		text-decoration: none;
		color: white;
		background-color: #f0f0f0;
		border-radius: 5px;
		transition: background-color 0.3s;

		&:hover {
			background-color: #f8f8f8;
		}
	}

	.pagination a {
		padding: 5px 10px;
		margin: -5px -10px;
	}
`;
