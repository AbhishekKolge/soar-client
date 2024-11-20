import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BankSelectFilter } from "../../../components/ui/bank-select-filter";

const AccountTableToolbar = ({
  onSearch,
  searchValue,
  clearBank,
  addBank,
  clearAllFilters,
  bankId,
}) => {
  const isFiltered = bankId.length;

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
          <BankSelectFilter
            onSelect={addBank}
            selected={bankId}
            onClear={clearBank}
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

export default AccountTableToolbar;
