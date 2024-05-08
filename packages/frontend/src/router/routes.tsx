import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { useUserStore } from '~store/users.store';

export function PrivateRoute(): EmotionJSX.Element {
	const user = useUserStore((state) => state.user);

	return user ? <Outlet /> : <Navigate to={ROUTER_KEYS.LOGIN} />;
}

export function PublicRoute(): EmotionJSX.Element {
	const user = useUserStore((state) => state.user);

	return !user ? <Outlet /> : <Navigate to={ROUTER_KEYS.APP} />;
}
