import React, {
    MutableRefObject,
    RefObject,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

export function useEvent<T extends Function>(fn: T) {
    const fnRef = useRef(fn);

    // @ts-ignore
    useLayoutEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    const eventCb = useCallback((...args: unknown[]) => fnRef.current.apply(null, args), [fnRef]);

    return eventCb as unknown as T;
}

export const useMouseView = (targetRef?: RefObject<HTMLDivElement> | null) => {
    const [show, setShow] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!targetRef) {
            return;
        }

        ref.current = targetRef.current;
    }, []);

    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }

        ref.current.addEventListener("mouseenter", handleMouseEnter);
        ref.current.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            if (!ref.current) {
                return;
            }
            ref.current.removeEventListener("mouseenter", handleMouseEnter);
            ref.current.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [ref]);

    const handleMouseEnter = () => {
        setShow(true);
    };

    const handleMouseLeave = () => {
        setShow(false);
    };

    return [show];
};
