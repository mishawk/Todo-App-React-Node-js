import { css } from '@emotion/react';

export const paginationWrapperStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 0;
	margin-bottom: 20px;
`;

export const paginationLinkStyles = css`
	margin: 0 20px;
	padding: 10px 20px;
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
		margin: 0 5px;
		padding: 10px 20px;
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
		padding: 10px 20px;
		margin: -10px -20px;
	}
`;
