import { Input } from "@/components/ui/input";
import { useGetCountriesQuery } from "../../features/utils/utils-api-slice";
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

export const ContactInput = forwardRef((props, ref) => {
  const { codeProps, contactProps, disabled } = props;
  const [open, setOpen] = useState(false);

  const { data: countriesData, isLoading: countriesIsLoading } =
    useGetCountriesQuery({});

  const selectedCountry = countriesData?.countries.find((country) => {
    return country.id === codeProps.value;
  });

  const selectCountryHandler = (countryId) => {
    if (codeProps.value === countryId) {
      codeProps.onSelect(null);
    } else {
      codeProps.onSelect(countryId);
    }
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-[120px] justify-between text-xs lg:text-[15px]",
              !codeProps?.value ? "text-muted-foreground" : "text-muted"
            )}
          >
            {selectedCountry ? selectedCountry.phoneCode : "Code"}
            <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-0" align="start">
          <Command
            filter={(value, search) => {
              return countryFilter(value, search, countriesData.countries);
            }}
          >
            <CommandInput placeholder="Search..." />
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
                        {`${country.phoneCode} (${country.shortName})`}
                        <Check
                          className={cn(
                            "ml-auto",
                            country.id === codeProps?.value
                              ? "opacity-100"
                              : "opacity-0"
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
      <Input ref={ref} {...contactProps} />
    </div>
  );
});

ContactInput.displayName = "ContactInput";
