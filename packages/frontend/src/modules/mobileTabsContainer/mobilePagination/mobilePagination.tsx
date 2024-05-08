import { Button } from '@blueprintjs/core';
import { Global } from '@emotion/react';
import ReactPaginate from 'react-paginate';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
	globalStyles,
	paginationLinkStyles,
	paginationWrapperStyles,
} from './mobilePagination.styles';

export const MobilePagination = ({
	handlePageChange,
	pageCount,
	currentPage,
}): EmotionJSX.Element => {
	return (
		<>
			<Global styles={globalStyles} />
			<ReactPaginate
				onPageChange={handlePageChange}
				previousLabel={<Button css={paginationLinkStyles}>Back</Button>}
				nextLabel={<Button css={paginationLinkStyles}>Next</Button>}
				breakLabel={'...'}
				pageCount={pageCount}
				breakClassName={'break-me'}
				pageRangeDisplayed={3}
				marginPagesDisplayed={0}
				pageClassName={'pagination'}
				css={paginationWrapperStyles}
				forcePage={currentPage}
			/>
		</>
	);
};

export default MobilePagination;
