import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useInView } from "react-intersection-observer";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Separator } from "./separator";
import { Badge } from "./badge";
import { CheckIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useLazyGetBanksQuery } from "../../features/utils/utils-api-slice";
import { useInfiniteScroll } from "../../utils/hooks";
import { useState } from "react";
import { CircleSlash } from "lucide-react";
import { Loader2 } from "lucide-react";

export const BankSelectFilter = (props) => {
  const { onSelect, selected, onClear } = props;
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView({
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

  const isLoading = bankIsLoading || bankIsFetching;

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={togglePopoverHandler}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-center border-dashed text-base text-[14px] lg:text-base"
          >
            Bank
            {!!selected.length && (
              <>
                <Separator orientation="vertical" className="mx-2 h-8" />
                <Badge
                  variant="secondary"
                  className="rounded-sm bg-white px-2 text-base h-full font-medium text-[14px] lg:text-base"
                >
                  {`${selected.length} selected`}
                </Badge>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto" side="bottom" align="start">
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
                    const isSelected = selected.includes(item.id);
                    return (
                      <CommandItem
                        ref={lastItem ? ref : null}
                        key={item.id}
                        value={item.id}
                        onSelect={onSelect.bind(null, item.id)}
                        className="gap-4"
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className={cn("h-4 w-4")} />
                        </div>
                        <span className="capitalize">{item.name}</span>
                      </CommandItem>
                    );
                  })
                ) : isLoading ? (
                  <></>
                ) : (
                  <span className="text-center text-sm w-100 block p-4">
                    <CircleSlash size={16} className="m-auto" />
                    <span className="mt-1 block">Found nothing</span>
                  </span>
                )}
                {isLoading && (
                  <span className="text-center text-sm w-100 block p-4">
                    <Loader2 className="m-auto h-4 w-4 animate-spin" />
                  </span>
                )}
              </CommandGroup>
            </CommandList>

            {!!selected.length && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={onClear}
                    className="justify-center text-center cursor-pointer"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
