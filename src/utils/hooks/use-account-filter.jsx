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
  bankId: [],
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
  if (action.type === "CLEAR_BANK") {
    return {
      ...state,
      page: initialFilterState.page,
      bankId: [],
    };
  }

  if (action.type === "ADD_BANK") {
    return {
      ...state,
      page: initialFilterState.page,
      bankId: [...state.bankId, action.value],
    };
  }

  if (action.type === "REMOVE_BANK") {
    const updated = state.bankId.filter((id) => id !== action.value);
    return {
      ...state,
      page: initialFilterState.page,
      bankId: updated,
    };
  }

  if (action.type === "CLEAR_ALL_FILTER") {
    return {
      ...state,
      search: null,
      page: initialFilterState.page,
      bankId: [],
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

export const useAccountFilter = () => {
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

  const clearBank = () => {
    dispatchQueryFilter({ type: "CLEAR_BANK" });
  };

  const addBank = (value) => {
    if (queryFilterState.bankId.includes(value)) {
      dispatchQueryFilter({ type: "REMOVE_BANK", value });
      return;
    }
    dispatchQueryFilter({ type: "ADD_BANK", value });
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
      clearBank,
      addBank,
      clearAllFilters,
    },
  };
};
