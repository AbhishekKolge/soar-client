import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const DatePicker = (props) => {
  const { placeholder = "Pick a date", value, onSelect } = props;
  const [open, setOpen] = useState(false);

  const dateSelectHandler = (value) => {
    onSelect(value ? value.toISOString() : null);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full text-xs lg:text-[15px]",
            !value ? "text-muted-foreground" : "text-primary"
          )}
        >
          {value ? (
            format(new Date(value), "dd MMMM yyyy")
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...props}
          mode="single"
          selected={new Date(value)}
          onSelect={dateSelectHandler}
        />
      </PopoverContent>
    </Popover>
  );
};
