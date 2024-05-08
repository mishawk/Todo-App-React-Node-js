import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Slider } from '../slider/slider.module';
import { TodoCard } from '../tabletTodoCard/tabletTodoCard';

export const TodoSlider = ({
	todos,
	localCounter,
	nextSlide,
	prevSlide,
	handleToggleStatus,
	handleDeleteTodo,
	getTodoById,
}): EmotionJSX.Element => {
	return (
		<Slider
			localCounter={localCounter}
			nextSlide={nextSlide}
			prevSlide={prevSlide}
		>
			{todos.map((todo) => (
				<div key={todo.id}>
					<TodoCard
						todo={todo}
						handleToggleStatus={handleToggleStatus}
						handleDeleteTodo={handleDeleteTodo}
						getTodoById={getTodoById}
					/>
				</div>
			))}
		</Slider>
	);
};
