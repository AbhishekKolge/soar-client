import { useReducer, useCallback } from "react";
import _ from "lodash";
import { DEBOUNCE_TIME } from "../constants";
import { errorToast } from "../helper";

const initialFilterState = {
  search: null,
  page: 1,
};

const initialState = {
  totalPages: 0,
  data: [],
  initialFetch: true,
};

const filterReducer = (state, action) => {
  if (action.type === "CHANGE_PAGE") {
    return {
      ...state,
      page: action.page,
    };
  }
  if (action.type === "SEARCH") {
    return {
      ...state,
      page: initialFilterState.page,
      search: action.search,
    };
  }
  if (action.type === "RESET_FILTERS") {
    return {
      ...initialFilterState,
    };
  }
  return initialFilterState;
};

const stateReducer = (state, action) => {
  if (action.type === "SET_DATA") {
    return {
      ...state,
      totalPages: action.totalPages,
      data: action.data,
      initialFetch: false,
    };
  }
  if (action.type === "APPEND_DATA") {
    return {
      ...state,
      data: [...state.data, ...action.data],
    };
  }
  if (action.type === "CLEAR_DATA") {
    return {
      ...initialState,
    };
  }

  return initialState;
};

export const useInfiniteScroll = ({ fetch }) => {
  const [filterState, dispatchFilter] = useReducer(
    filterReducer,
    initialFilterState
  );
  const [state, dispatchState] = useReducer(stateReducer, initialState);

  const nextPageHandler = () => {
    if (filterState.page < state.totalPages) {
      dispatchFilter({
        type: "CHANGE_PAGE",
        page: filterState.page + 1,
      });
      fetch({ ...filterState, page: filterState.page + 1 }, true)
        .unwrap()
        .then((data) => {
          dispatchState({
            type: "APPEND_DATA",
            data: data.results,
          });
        })
        .catch((error) => {
          if (error.data?.msg) {
            errorToast(error.data.msg);
          } else {
            errorToast("Something went wrong!, please try again");
          }
        });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleSearch = useCallback(
    _.debounce((search) => {
      fetch({ ...initialFilterState, search }, true)
        .unwrap()
        .then((data) => {
          dispatchState({
            type: "SET_DATA",
            data: data.results,
            totalPages: data.totalPages,
          });
        })
        .catch((error) => {
          if (error.data?.msg) {
            errorToast(error.data.msg);
          } else {
            errorToast("Something went wrong!, please try again");
          }
        });
    }, DEBOUNCE_TIME),
    []
  );
  const searchHandler = (value) => {
    const search = value;
    dispatchFilter({ type: "SEARCH", search });
    debouncedHandleSearch(search);
  };

  const resetFilterHandler = () => {
    dispatchFilter({ type: "RESET_FILTERS" });
    dispatchState({
      type: "CLEAR_DATA",
    });
  };

  return {
    filterState,
    state,
    dispatchState,
    nextPageHandler,
    searchHandler,
    resetFilterHandler,
  };
};
