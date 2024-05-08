import * as React from 'react';
import { Spinner } from '@blueprintjs/core';
import { loaderStyles } from './loader.styles';

const Loader: React.FunctionComponent = () => {
	return (
		<div css={loaderStyles}>
			<Spinner />
		</div>
	);
};

export default Loader;
