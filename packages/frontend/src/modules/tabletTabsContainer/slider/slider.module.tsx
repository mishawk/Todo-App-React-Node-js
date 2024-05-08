import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
	leftArrowStyles,
	rightArrowStyles,
} from '../tabletTodoSlider/tabletTodoSlider.styles';
import { ArrowRight, ArrowLeft } from '@blueprintjs/icons';

export const Slider = ({
	children,
	nextSlide,
	prevSlide,
	localCounter,
}): EmotionJSX.Element => {
	return (
		<div>
			<ArrowLeft onClick={prevSlide} css={leftArrowStyles} />

			<ArrowRight onClick={nextSlide} css={rightArrowStyles} />
			{children.map((child, index) => (
				<div
					key={index}
					style={{
						display: index === localCounter ? 'block' : 'none',
					}}
				>
					{child}
				</div>
			))}
		</div>
	);
};
