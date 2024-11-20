import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useInView } from "react-intersection-observer";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useLazyGetBanksQuery } from "../../features/utils/utils-api-slice";
import { useInfiniteScroll } from "../../utils/hooks";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Check } from "lucide-react";

export const BankSelect = forwardRef((props, ref) => {
  const { bank, onSelect, disabled } = props;
  const [open, setOpen] = useState(false);
  const { ref: viewRef, inView } = useInView({
    threshold: 0,
  });
  const [getBanks, { isLoading: bankIsLoading, isFetching: bankIsFetching }] =
    useLazyGetBanksQuery();

  const {
    filterState: bankFilterState,
    state: bankState,
    dispatchState: dispatchBankState,
    nextPageHandler: nextBankPageHandler,
    searchHandler: searchBankHandler,
    resetFilterHandler: resetBankFilterHandler,
  } = useInfiniteScroll({ fetch: getBanks });

  const togglePopoverHandler = (value) => {
    setOpen(value);
    !value && resetBankFilterHandler();
  };

  useEffect(() => {
    if (bankState.initialFetch) {
      getBanks({}, true)
        .unwrap()
        .then((data) => {
          dispatchBankState({
            type: "SET_DATA",
            data: data.results,
            totalPages: data.totalPages,
          });
        });
    }
  }, [bankState, getBanks, dispatchBankState]);

  useEffect(() => {
    if (inView) {
      nextBankPageHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const selectBankHandler = (selectedBank) => {
    if (bank.id === selectedBank.id) {
      onSelect({
        id: "",
        name: "",
      });
    } else {
      onSelect(selectedBank);
    }
    setOpen(false);
  };

  const isLoading = bankIsLoading || bankIsFetching;

  return (
    <Popover open={open} onOpenChange={togglePopoverHandler}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-xs lg:text-[15px]",
            !bank.id ? "text-muted-foreground" : "text-muted"
          )}
        >
          {bank.id ? bank.name : "Select Bank"}
          <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search..."
            onValueChange={searchBankHandler}
            value={bankFilterState.search}
          />
          <CommandList>
            <CommandGroup>
              {bankState?.data?.length ? (
                bankState.data.map((item, index) => {
                  const lastItem = index === bankState.data.length - 1;
                  const isSelected = bank.id === item.id;
                  return (
                    <CommandItem
                      ref={lastItem ? viewRef : null}
                      key={item.id}
                      value={item.id}
                      onSelect={selectBankHandler.bind(null, item)}
                    >
                      {item.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })
              ) : isLoading ? (
                <></>
              ) : (
                <span className="text-center text-sm w-100 block p-4">
                  <span className="mt-1 block">No countries found</span>
                </span>
              )}
              {isLoading && (
                <span className="text-center text-sm w-100 block p-4">
                  <Loader2 className="m-auto h-4 w-4 animate-spin" />
                </span>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

BankSelect.displayName = "BankSelect";
