/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from "react";

function useOnClickOutside(dropRef: { current: any }, btnRef: { current: any }, handler: (evt: any) => void) {
  const setHandler = useCallback(
    (event: any) => {
      handler(event);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    const listener = (event: { target: any }) => {
      // Do nothing if clicking ref's element or descendent elements
      if (dropRef.current && btnRef && !dropRef.current.contains(event.target) && !btnRef.current?.contains(event.target)) {
        setHandler(event);
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropRef, handler]);
}

export default useOnClickOutside;
