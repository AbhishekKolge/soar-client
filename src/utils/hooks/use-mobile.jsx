import { useEffect, useState } from "react";
import {
  DESKTOP_BREAKPOINT,
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
} from "../constants/defaults";

export const useBreakpoint = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
      );
      setIsTablet(
        window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`).matches
      );
      setIsDesktop(
        window.matchMedia(`(max-width: ${DESKTOP_BREAKPOINT - 1}px)`).matches
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
};
