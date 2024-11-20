import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Separator } from "./separator";
import { Badge } from "./badge";
import { TRANSACTION_METHOD_OPTIONS } from "../../utils/constants/defaults";
import { CheckIcon } from "@radix-ui/react-icons";

export const TransactionMethodSelect = (props) => {
  const { onSelect, selected, onClear } = props;

  return (
    <div className="flex items-center space-x-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-center border-dashed text-base lg:text-base"
          >
            Type
            {!!selected.length && (
              <>
                <Separator orientation="vertical" className="mx-2 h-8" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-2 text-base h-full font-medium"
                >
                  {`${selected.length} selected`}
                </Badge>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No method found.</CommandEmpty>
              <CommandGroup>
                {TRANSACTION_METHOD_OPTIONS.map((item) => {
                  const isSelected = selected.includes(item.value);
                  return (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={onSelect.bind(null, item.value)}
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
                      <span className="capitalize">{item.label}</span>
                    </CommandItem>
                  );
                })}
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
