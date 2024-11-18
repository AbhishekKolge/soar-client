import { useEffect } from "react";
import { useState } from "react";
import { MOBILE_BREAKPOINT } from "../constants/defaults";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(undefined);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
};