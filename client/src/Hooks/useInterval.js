import { useEffect, useRef } from 'react';

export function useInterval() {
    const interval = useRef(null);

    const set = (callback, ms) => interval.current = setInterval(callback, ms);

    const clear = () => {
        clearInterval(interval.current);
        interval.current = null;
    }

    useEffect(() => clear, []);

    return [ interval, set, clear ];
}