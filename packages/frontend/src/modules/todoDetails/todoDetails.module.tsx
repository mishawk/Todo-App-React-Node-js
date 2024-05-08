import { Button, Card, H1, H5, Switch } from '@blueprintjs/core';
import {
	cardStyles,
	goBackButton,
	h1Styles,
	h5Styles,
	pStyles,
	pageStyles,
	textStyle,
} from './todoDetails.styles';
import { useTodoStore } from '~store/todo.store';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavbarComponent from '~shared/components/navBar/navBar.module';
import { ROUTER_KEYS } from '~shared/keys';
import Loader from '~shared/components/loader/loader.component';

const TodoDetails: React.FC = () => {
	const { id: rawId } = useParams();
	const id = parseInt(rawId.match(/\d+/)[0]);
	const { todo, getTodoById, updateTodo } = useTodoStore();
	const [isPublic, setIsPublic] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (todo) {
			setIsPublic(todo.isPublic);
		}
	}, [todo]);

	const handleTogglePublic = async (
		id,
		currentPublicStatus,
	): Promise<void> => {
		const newPublicStatus = !currentPublicStatus;
		await updateTodo(Number(id), { isPublic: newPublicStatus });
		setIsPublic(newPublicStatus);
	};

	useEffect(() => {
		(async (): Promise<void> => {
			await getTodoById(Number(id));
		})();
		setIsLoading(false);
	}, [id, getTodoById]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<NavbarComponent />
			<div css={pageStyles}>
				<Card elevation={2} css={cardStyles}>
					<H1 css={h1Styles}>Todo Details</H1>
					{!todo ? (
						<p>Todo not found</p>
					) : (
						<>
							<div css={pStyles}>
								<H5 css={h5Styles}>ID:</H5>
								<span css={textStyle}>{todo.id}</span>
							</div>

							<div css={pStyles}>
								<H5 css={h5Styles}>Title:</H5>
								<span css={textStyle}>{todo.title}</span>
							</div>

							<div css={pStyles}>
								<H5 css={h5Styles}>Description:</H5>
								<span css={textStyle}>{todo.description}</span>
							</div>

							<Switch
								large={true}
								innerLabelChecked="Public"
								innerLabel="Private"
								checked={isPublic}
								onChange={() =>
									handleTogglePublic(todo.id, isPublic)
								}
							/>
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

export default TodoDetails;
