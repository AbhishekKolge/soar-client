import { useEffect } from "react";
import { errorToast } from "../helper";

export const useQueryError = (error, success) => {
  useEffect(() => {
    if (error) {
      if (error.data?.msg) {
        errorToast(error.data.msg);
      } else {
        errorToast("Something went wrong!, please try again");
      }
    }
  }, [error, success]);

  return null;
};
