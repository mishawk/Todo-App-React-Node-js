import * as React from 'react';
import { BrowserRouter as ReactRouter, Route, Routes } from 'react-router-dom';
import App from '~modules/app/app.module';

import LoginPage from '~modules/loginPage/loginPage.module';
import HomePage from '~modules/homePage/homePage.module';
import RegisterPage from '~modules/registerPage/registerPage.module';
import VerificationMessage from '~modules/verificationMessage/verificationMessage.module';
import TodoDetails from '~modules/todoDetails/todoDetails.module';
import { PublicRoute, PrivateRoute } from './routes';
import UserPage from '~modules/userPage/userPage.module';
import ChangePasswordPage from '~modules/changePasswordPage/changePasswordPage.module';
import { ROUTER_KEYS } from '~shared/keys';
import ForgotPasswordPage from '~modules/forgotPasswordPage/forgotPasswordPage.module';

const Router: React.FunctionComponent = () => {
	return (
		<ReactRouter>
			<Routes>
				<Route path={ROUTER_KEYS.HOME} element={<PublicRoute />}>
					<Route index element={<HomePage />} />
				</Route>

				<Route path={ROUTER_KEYS.REGISTER} element={<PublicRoute />}>
					<Route index element={<RegisterPage />} />
				</Route>

				<Route
					path={ROUTER_KEYS.VERIFICATION}
					element={<PublicRoute />}
				>
					<Route index element={<VerificationMessage />} />
				</Route>

				<Route path={ROUTER_KEYS.LOGIN} element={<PublicRoute />}>
					<Route index element={<LoginPage />} />
				</Route>

				<Route path={ROUTER_KEYS.APP} element={<PrivateRoute />}>
					<Route index element={<App />} />
				</Route>

				<Route
					path={ROUTER_KEYS.TODO_DETAILS}
					element={<PrivateRoute />}
				>
					<Route index element={<TodoDetails />} />
				</Route>

				<Route path={ROUTER_KEYS.USER_PAGE} element={<PrivateRoute />}>
					<Route index element={<UserPage />} />
				</Route>

				<Route
					path={ROUTER_KEYS.FORGOT_PASSWORD}
					element={<PublicRoute />}
				>
					<Route index element={<ForgotPasswordPage />} />
				</Route>

				<Route
					path={ROUTER_KEYS.CHANGE_PASSWORD}
					element={<PrivateRoute />}
				>
					<Route index element={<ChangePasswordPage />} />
				</Route>
			</Routes>
		</ReactRouter>
	);
};

export default Router;
