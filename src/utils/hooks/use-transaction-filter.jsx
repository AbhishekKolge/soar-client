import { useReducer, useCallback, useEffect } from "react";
import { omitEmptyKeys, pickExactObjKeys } from "../helper";
import { DEBOUNCE_TIME, DEFAULT_PAGE } from "../constants";
import _ from "lodash";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

const initialFilterState = {
  page: DEFAULT_PAGE,
  sortKey: null,
  sortMethod: null,
  nullishSort: false,
  sortType: null,
  search: null,
  category: [],
  method: [],
};

const initialHelperState = {
  firstRender: true,
  search: "",
};

const queryFilterReducer = (state, action) => {
  if (action.type === "CHANGE_PAGE") {
    return {
      ...state,
      page: action.page,
    };
  }
  if (action.type === "SET_FILTERS") {
    return {
      ...state,
      ...action.filters,
    };
  }
  if (action.type === "SET_SORT") {
    return {
      ...state,
      sortKey: action.sortKey,
      sortMethod: action.sortMethod,
      sortType: action.sortType,
      nullishSort: action.nullishSort,
    };
  }
  if (action.type === "SEARCH") {
    return {
      ...state,
      page: initialFilterState.page,
      search: action.search,
    };
  }
  if (action.type === "CLEAR_CATEGORY") {
    return {
      ...state,
      page: initialFilterState.page,
      category: [],
    };
  }
  if (action.type === "CLEAR_METHOD") {
    return {
      ...state,
      page: initialFilterState.page,
      method: [],
    };
  }
  if (action.type === "ADD_CATEGORY") {
    return {
      ...state,
      page: initialFilterState.page,
      category: [...state.category, action.value],
    };
  }
  if (action.type === "ADD_METHOD") {
    return {
      ...state,
      page: initialFilterState.page,
      method: [...state.method, action.value],
    };
  }
  if (action.type === "REMOVE_CATEGORY") {
    const updated = state.category.filter((id) => id !== action.value);
    return {
      ...state,
      page: initialFilterState.page,
      category: updated,
    };
  }
  if (action.type === "REMOVE_METHOD") {
    const updated = state.method.filter((id) => id !== action.value);
    return {
      ...state,
      page: initialFilterState.page,
      method: updated,
    };
  }
  if (action.type === "CLEAR_ALL_FILTER") {
    return {
      ...state,
      search: null,
      page: initialFilterState.page,
      category: [],
      method: [],
    };
  }
  return initialFilterState;
};

const helperReducer = (state, action) => {
  if (action.type === "DISABLE_FIRST_RENDER") {
    return {
      ...state,
      firstRender: false,
    };
  }
  if (action.type === "SEARCH") {
    return {
      ...state,
      search: action.search,
    };
  }
  return initialHelperState;
};

export const useTransactionFilter = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialFilterState
  );
  const [helperState, dispatchHelper] = useReducer(
    helperReducer,
    initialHelperState
  );

  const buildQueryParamHandler = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params.toString();
  };

  const nextPageHandler = () => {
    dispatchQueryFilter({
      type: "CHANGE_PAGE",
      page: queryFilterState.page + 1,
    });
  };

  const prevPageHandler = () => {
    dispatchQueryFilter({
      type: "CHANGE_PAGE",
      page: queryFilterState.page - 1,
    });
  };

  const sortHandler = ({ sortKey, sortMethod, sortType, nullishSort }) => {
    dispatchQueryFilter({
      type: "SET_SORT",
      sortKey,
      sortMethod,
      sortType,
      nullishSort,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleSearch = useCallback(
    _.debounce((search) => {
      dispatchQueryFilter({ type: "SEARCH", search });
    }, DEBOUNCE_TIME),
    []
  );

  const searchHandler = (e) => {
    const search = e.target.value;
    dispatchHelper({ type: "SEARCH", search });
    debouncedHandleSearch(search);
  };

  const clearCategory = () => {
    dispatchQueryFilter({ type: "CLEAR_CATEGORY" });
  };
  const clearMethod = () => {
    dispatchQueryFilter({ type: "CLEAR_METHOD" });
  };

  const addCategory = (value) => {
    if (queryFilterState.category.includes(value)) {
      dispatchQueryFilter({ type: "REMOVE_CATEGORY", value });
      return;
    }
    dispatchQueryFilter({ type: "ADD_CATEGORY", value });
  };
  const addMethod = (value) => {
    if (queryFilterState.method.includes(value)) {
      dispatchQueryFilter({ type: "REMOVE_METHOD", value });
      return;
    }
    dispatchQueryFilter({ type: "ADD_METHOD", value });
  };

  const clearAllFilters = () => {
    dispatchQueryFilter({ type: "CLEAR_ALL_FILTER" });
    dispatchHelper({ type: "SEARCH", search: "" });
  };

  useEffect(() => {
    if (helperState.firstRender) {
      const queryParamsFilter = omitEmptyKeys(
        JSON.parse(searchParams.get("filter"))
      );
      const filters = pickExactObjKeys(queryFilterState, queryParamsFilter);
      dispatchQueryFilter({
        type: "SET_FILTERS",
        filters,
      });
      if (filters.search) {
        dispatchHelper({ type: "SEARCH", search: filters.search });
      }
      dispatchHelper({ type: "DISABLE_FIRST_RENDER" });
    }
  }, [helperState.firstRender, queryFilterState, searchParams]);

  useEffect(() => {
    if (!helperState.firstRender) {
      const updatedQuery = buildQueryParamHandler(
        "filter",
        JSON.stringify(queryFilterState)
      );

      navigate(`${location.pathname}?${updatedQuery}`, { replace: true });
    }
  }, [helperState.firstRender, queryFilterState, navigate, location.pathname]);

  return {
    queryFilterState,
    helperState,
    methods: {
      nextPageHandler,
      prevPageHandler,
      sortHandler,
      searchHandler,
      clearCategory,
      clearMethod,
      addCategory,
      addMethod,
      clearAllFilters,
    },
  };
};
