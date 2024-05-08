import { Button, ButtonGroup } from '@blueprintjs/core';

export const PaginationComponent = ({
	totalPages,
	currentPage,
	handlePageChange,
}): React.ReactNode => (
	<div style={{ marginTop: '10px' }}>
		<ButtonGroup minimal={true}>
			{Array.from({ length: totalPages }, (_, index) => index + 1).map(
				(pageNumber) => (
					<Button
						key={pageNumber}
						active={pageNumber === currentPage}
						onClick={() => handlePageChange(pageNumber)}
					>
						{pageNumber}
					</Button>
				),
			)}
		</ButtonGroup>
	</div>
);
