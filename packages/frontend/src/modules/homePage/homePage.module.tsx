import { Card, Button, Intent } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import {
	containerStyle,
	cardStyle,
	appNameStyle,
	buttonStyle,
	forgotPasswordStyle,
	buttonContainerStyle,
} from './homePage.styles';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';

const HomePage = (): React.ReactNode => {
	return (
		<div css={containerStyle}>
			<Card css={cardStyle}>
				<h1 css={appNameStyle}>Todo App</h1>
				<div css={buttonContainerStyle}>
					<Link to={ROUTER_KEYS.LOGIN}>
						<Button intent={Intent.PRIMARY} css={buttonStyle}>
							Login
						</Button>
					</Link>

					<Link to={ROUTER_KEYS.REGISTER}>
						<Button intent={Intent.SUCCESS} css={buttonStyle}>
							Register
						</Button>
					</Link>
				</div>
				<br />

				<Link
					to={ROUTER_KEYS.FORGOT_PASSWORD}
					css={forgotPasswordStyle}
				>
					Forgot Password?
				</Link>
			</Card>
		</div>
	);
};

export default HomePage;
