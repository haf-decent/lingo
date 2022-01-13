import { useCallback, useEffect, useState } from "react";

import { useInterval } from "./useInterval";

export function padNumber(num, zeroes = 2) {
	return (num < Math.pow(10, zeroes - 1))
		? (new Array(zeroes).fill(0).join("") + num).slice(-zeroes)
		: num;
}

const intervals = [ 60, 60, 24 ];
export function formatTime(ms, places = 4) {
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	return [ seconds, minutes, hours, days ]
		.map((time, i, arr) => i === arr.length - 1 ? time: padNumber(time % intervals[i]))
		.slice(0, places)
		.reverse()
		.join(":");
}

export function useTimer(shouldCount) {
	const [ time, setTime ] = useState(formatTime(0, 2));

	const [, set, clear ] = useInterval();

	const restart = useCallback(() => {
		clear();
		setTime(formatTime(0, 2));
		
		const start = Date.now();
		set(() => setTime(formatTime(Date.now() - start, 2)), 1000);
	}, []);

	useEffect(() => {
		if (!shouldCount) return;
		
		restart();

		return clear;
	}, [ shouldCount, restart ]);

	return [ time, restart ];
}