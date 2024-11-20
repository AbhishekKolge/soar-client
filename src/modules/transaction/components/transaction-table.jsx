import { useGetTransactionQuery } from "../../../features/transaction/transaction-api-slice";
import { useTransactionFilter } from "../../../utils/hooks";
import transactionColumn from "./transaction-column";
import TransactionDataTable from "./transaction-data-table";

const TransactionTable = () => {
  const {
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
  } = useTransactionFilter();
  const {
    data: transactionData,
    isLoading: transactionIsLoading,
    isFetching: transactionIsFetching,
  } = useGetTransactionQuery(queryFilterState, {
    skip: helperState.firstRender,
  });

  const data = transactionData?.results || [];
  const totalPages = transactionData?.totalPages;

  return (
    <div className="h-full overflow-x-scroll">
      <TransactionDataTable
        isLoading={
          transactionIsLoading ||
          transactionIsFetching ||
          helperState.firstRender
        }
        onNext={nextPageHandler}
        onPrev={prevPageHandler}
        totalPages={totalPages}
        currentPage={queryFilterState.page}
        data={data}
        columns={transactionColumn}
        onSort={sortHandler}
        sortKey={queryFilterState.sortKey}
        sortType={queryFilterState.sortType}
        onSearch={searchHandler}
        searchValue={helperState.search}
        clearCategory={clearCategory}
        clearMethod={clearMethod}
        addCategory={addCategory}
        addMethod={addMethod}
        clearAllFilters={clearAllFilters}
        category={queryFilterState.category}
        method={queryFilterState.method}
      />
    </div>
  );
};

export default TransactionTable;
