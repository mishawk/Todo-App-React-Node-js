import { useState, useEffect } from 'react';

type DebouncedValue<T> = T;

export default function useDebounce<T>(
	value: T,
	delay: number,
): DebouncedValue<T> {
	const [debouncedValue, setDebouncedValue] =
		useState<DebouncedValue<T>>(value);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timerId);
		};
	}, [value, delay]);

	return debouncedValue;
}
