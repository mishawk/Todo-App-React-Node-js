import { Button, Card, Elevation, H5 } from '@blueprintjs/core';
import { pageStyles } from './verificationMessage.styles';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';

const VerificationMessage = (): React.ReactNode => {
	return (
		<div css={pageStyles}>
			<Card interactive={true} elevation={Elevation.TWO}>
				<H5>Verification</H5>
				<p>
					A verification token has been sent to your email. Please
					check your inbox.
				</p>

				<Link to={ROUTER_KEYS.HOME}>
					<Button>Go Back</Button>
				</Link>
			</Card>
		</div>
	);
};

export default VerificationMessage;
