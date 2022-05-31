import { useEffect } from "react";

export function useEventListener ({ event, callback, target = window, enabled = true }) {
	useEffect(() => {
		if (!enabled) return;

		const old = { event, callback, target };
		target.addEventListener(event, callback);

		return () => old.target.removeEventListener(old.event, old.callback);
	}, [ event, callback, target, enabled ]);
}