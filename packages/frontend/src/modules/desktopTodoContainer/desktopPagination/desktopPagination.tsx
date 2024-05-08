import { Button } from '@blueprintjs/core';
import { Global } from '@emotion/react';
import ReactPaginate from 'react-paginate';
import {
	globalStyles,
	paginationLinkStyles,
	paginationWrapperStyles,
} from './desktopPagination.styles';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export const DesktopPagination = ({
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
				pageRangeDisplayed={5}
				pageClassName={'pagination'}
				css={paginationWrapperStyles}
				forcePage={currentPage}
			/>
		</>
	);
};

export default DesktopPagination;
