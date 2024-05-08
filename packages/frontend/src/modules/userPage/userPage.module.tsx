import { Button, Card, H1, H5 } from '@blueprintjs/core';
import {
	cardStyles,
	editButton,
	goBackButton,
	h1Styles,
	h5Styles,
	pStyles,
	pageStyles,
	textStyle,
} from './userPage.styles';
import { useUserStore } from '~store/users.store';
import { Link } from 'react-router-dom';
import NavbarComponent from '~shared/components/navBar/navBar.module';
import { useState } from 'react';
import UserEditForm from './userEditForm.module';
import { ROUTER_KEYS } from '~shared/keys';

const UserPage: React.FC = () => {
	const { user, updateUser } = useUserStore();

	const [isEditing, setIsEditing] = useState(false);

	const onSubmit = async (values): Promise<void> => {
		await updateUser(user.id, values);
		setIsEditing(false);
	};

	return (
		<>
			<NavbarComponent />
			<div css={pageStyles}>
				<Card elevation={2} css={cardStyles}>
					<H1 css={h1Styles}>User Details</H1>
					<Button
						css={editButton}
						onClick={() => setIsEditing((isEditing) => !isEditing)}
					>
						{isEditing ? 'Cancel' : 'Edit'}
					</Button>

					<Link to={ROUTER_KEYS.CHANGE_PASSWORD}>
						<Button css={editButton}>Change password</Button>
					</Link>
					{!user ? (
						<p>User not found</p>
					) : isEditing ? (
						<UserEditForm user={user} onSubmit={onSubmit} />
					) : (
						<>
							<div css={pStyles}>
								<H5 css={h5Styles}>Email:</H5>
								<span css={textStyle}>{user.email}</span>
							</div>

							<div css={pStyles}>
								<H5 css={h5Styles}>First Name:</H5>
								<span css={textStyle}>{user.firstName}</span>
							</div>

							<div css={pStyles}>
								<H5 css={h5Styles}>Last Name:</H5>
								<span css={textStyle}>{user.lastName}</span>
							</div>
						</>
					)}

					<Link to={ROUTER_KEYS.APP} css={goBackButton}>
						<Button>Go Back</Button>
					</Link>
				</Card>
			</div>
		</>
	);
};

export default UserPage;
