import { useEffect, useRef } from "react";

export const usePrev = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.curr = value;
    }, [value]);

    return ref.curr;
}