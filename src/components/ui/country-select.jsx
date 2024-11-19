import { useGetCountriesQuery } from "../../features/utils/utils-api-slice";
import { useQueryError } from "../../utils/hooks";
import { Check, ChevronDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { countryFilter } from "../../utils/helper";
import { forwardRef } from "react";

export const CountrySelect = forwardRef((props, ref) => {
  const { value, onSelect, disabled } = props;
  const [open, setOpen] = useState(false);

  const {
    data: countriesData,
    isLoading: countriesIsLoading,
    isSuccess: countriesIsSuccess,
    error: countriesError,
  } = useGetCountriesQuery({});
  useQueryError(countriesError, countriesIsSuccess);

  const selectedCountry = countriesData?.countries.find((country) => {
    return country.id === value;
  });

  const selectCountryHandler = (countryId) => {
    onSelect(countryId);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-xs lg:text-[15px]",
            !value ? "text-muted-foreground" : "text-muted"
          )}
        >
          {selectedCountry ? selectedCountry.name : "Select Country"}
          <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command
          filter={(value, search) => {
            return countryFilter(value, search, countriesData.countries);
          }}
        >
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>
              {countriesIsLoading
                ? "Countries are loading.."
                : "No countries found"}
            </CommandEmpty>
            {!!countriesData?.countries.length && (
              <CommandGroup>
                {countriesData.countries.map((country) => {
                  return (
                    <CommandItem
                      key={country.id}
                      value={country.id}
                      onSelect={selectCountryHandler}
                    >
                      {`${country.name} (${country.shortName})`}
                      <Check
                        className={cn(
                          "ml-auto",
                          country.id === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

CountrySelect.displayName = "CountrySelect";
