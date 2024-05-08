import { useUserStore } from '~store/users.store';
import { Navbar, Alignment, Button, Classes } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { navbarStyles } from './navbar.styles';

export const NavbarComponent = (): React.ReactNode => {
	const { logout } = useUserStore();

	return (
		<div style={{ marginBottom: '60px' }}>
			<Navbar css={navbarStyles}>
				<Navbar.Group align={Alignment.LEFT}>
					<Link to={ROUTER_KEYS.HOME} onClick={logout}>
						<Button
							className={Classes.MINIMAL}
							icon="home"
							text="Home"
						/>
					</Link>

					<Link to={ROUTER_KEYS.USER_PAGE}>
						<Button
							className={Classes.MINIMAL}
							icon="user"
							text="Profile"
						/>
					</Link>
				</Navbar.Group>

				<Navbar.Group align={Alignment.RIGHT}>
					<Link to={ROUTER_KEYS.HOME} onClick={logout}>
						<Button icon={IconNames.LOG_OUT}>Log Out</Button>
					</Link>
				</Navbar.Group>
			</Navbar>
		</div>
	);
};

export default NavbarComponent;
