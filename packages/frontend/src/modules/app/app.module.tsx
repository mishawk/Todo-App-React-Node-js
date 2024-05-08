import * as React from 'react';
import { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import Loader from '~shared/components/loader/loader.component';
import NavbarComponent from '~shared/components/navBar/navBar.module';

const TabletTabsContainer = React.lazy(
	() => import('~modules/tabletTabsContainer/tabletTodoContainer.module'),
);
const MobileTabsContainer = React.lazy(
	() => import('~modules/mobileTabsContainer/mobileTabsContainer.module'),
);
const DesktopTabsContainer = React.lazy(
	() => import('~modules/desktopTodoContainer/desktopTodoContainer.module'),
);

const App = (): React.ReactNode => {
	const isMobile = useMediaQuery({
		query: '(max-width: 425px)',
	});

	const isTablet = useMediaQuery({
		query: '(min-width: 426px) and (max-width: 768px)',
	});

	const isDesktop = useMediaQuery({
		query: '(min-width: 769px)',
	});

	return (
		<>
			<NavbarComponent />

			<Suspense fallback={<Loader />}>
				{isTablet && <TabletTabsContainer />}
				{isMobile && <MobileTabsContainer />}
				{isDesktop && <DesktopTabsContainer />}
			</Suspense>
		</>
	);
};

export default App;
