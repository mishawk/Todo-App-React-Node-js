import { css } from '@emotion/react';
import { colors } from '~shared/styles';

export const cellStyle = css`
	border: 1px solid ${colors.borderColor};
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	height: 50px;
`;
