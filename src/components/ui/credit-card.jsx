import { ICON } from "../../utils/constants";
import {
  formatCardValidity,
  formatCurrency,
  maskCreditCardNumber,
} from "../../utils/helper";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import { Button } from "./button";

export const CreditCard = (props) => {
  const { dark, details, onDelete, onActive, onEdit, disableActions } = props;
  const { isSelected, name, balance, number, validity } = details;

  return (
    <Card
      className={cn(
        "overflow-hidden relative",
        dark
          ? "bg-dark-gradient text-background"
          : "bg-background text-primary",
        isSelected && !disableActions && "border-success border-4"
      )}
    >
      {!disableActions && (
        <div className="absolute right-2 top-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className={cn(
                  "p-1 rounded-full !h-auto",
                  dark && "bg-foreground"
                )}
                variant="outline"
              >
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={onActive.bind(null, details)}>
                Set Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit.bind(null, details)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete.bind(null, details)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="flex justify-between items-center px-[26px] pt-[25px]">
        <div className="flex flex-col mb-8">
          <span className={cn("text-xs", !dark && "text-muted")}>Balance</span>
          <span className="text-xl font-semibold">
            {formatCurrency(balance.amount)}
          </span>
        </div>
        <img
          src={dark ? ICON.icons.chipLight : ICON.icons.chipDark}
          alt="credit card chip"
          className="w-[34.77px] h-[34.77px]"
        />
      </div>
      <div className="grid grid-cols-2 mb-8 px-[26px]">
        <div className="flex flex-col">
          <span
            className={cn(
              "uppercase text-xs",
              dark ? "opacity-70" : "text-muted"
            )}
          >
            Card holder
          </span>
          <span className="text-[15px] capitalize font-semibold">{name}</span>
        </div>
        <div className="flex flex-col">
          <span
            className={cn(
              "uppercase text-xs",
              dark ? "opacity-70" : "text-muted"
            )}
          >
            Valid thru
          </span>
          <span className="text-[15px] font-semibold">
            {formatCardValidity(validity)}
          </span>
        </div>
      </div>
      <div
        className={cn(
          "flex justify-between items-center px-[26px] py-[20px]",
          dark ? "bg-dark-gradient-2" : "bg-background"
        )}
      >
        <div className="font-semibold text-[22px]">
          {maskCreditCardNumber(number)}
        </div>
        <div className="relative w-11 h-[30px]">
          <div
            className={cn(
              "w-[30px] h-[30px] rounded-full opacity-50 absolute left-0",
              dark ? "bg-background" : "bg-muted-secondary"
            )}
          ></div>
          <div
            className={cn(
              "w-[30px] h-[30px] rounded-full opacity-50 absolute right-0",
              dark ? "bg-background" : "bg-muted-secondary"
            )}
          ></div>
        </div>
      </div>
    </Card>
  );
};
