import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useFirstRender } from "./use-first-render";

export const useDisclosure = (param = "open") => {
  const location = useLocation();
  const navigate = useNavigate();
  const { firstRender } = useFirstRender();

  const isOpen = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param) === "true";
  }, [location.search, param]);

  const [initiallyOpen, setInitiallyOpen] = useState(false);

  const setOpen = useCallback(
    (open) => {
      const searchParams = new URLSearchParams(location.search);
      if (open) {
        searchParams.set(param, "true");
      } else {
        searchParams.delete(param);
      }
      navigate({ search: searchParams.toString() }, { replace: true });
    },
    [location.search, navigate, param]
  );

  useEffect(() => {
    if (firstRender && isOpen) {
      setInitiallyOpen(true);
    }
  }, [firstRender, isOpen]);

  return { isOpen, setOpen, initiallyOpen };
};
