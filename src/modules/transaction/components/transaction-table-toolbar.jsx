import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TransactionCategorySelect } from "../../../components/ui/transaction-category-select";
import { TransactionMethodSelect } from "../../../components/ui/transaction-method-select";

const TransactionTableToolbar = ({
  onSearch,
  searchValue,
  clearCategory,
  clearMethod,
  addCategory,
  addMethod,
  clearAllFilters,
  category,
  method,
}) => {
  const isFiltered = category.length || method.length;

  return (
    <div className="flex items-center justify-between">
      <div className="w-full flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={onSearch}
          className="w-[150px] lg:w-[250px]"
        />
        <div className="overflow-x-scroll flex items-center space-x-2">
          <TransactionCategorySelect
            onSelect={addCategory}
            selected={category}
            onClear={clearCategory}
          />
          <TransactionMethodSelect
            onSelect={addMethod}
            selected={method}
            onClear={clearMethod}
          />

          {!!isFiltered && (
            <Button
              variant="secondary"
              onClick={clearAllFilters}
              className="h-8 px-2 lg:px-3 text-base lg:text-base"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionTableToolbar;
