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
        "relative w-full min-w-[265px] aspect-[265/170] rounded-[15px] lg:rounded-[25px] lg:aspect-[350/235] grid grid-rows-[46fr_22fr_32fr] lg:grid-rows-[95fr_70fr_70fr] overflow-hidden",
        dark ? "bg-dark-gradient text-white" : "bg-background text-primary",
        isSelected &&
          !disableActions &&
          "border-success border-2 lg:border-[3px]"
      )}
    >
      {!disableActions && (
        <div className="absolute right-[4px] top-[4px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className={cn(
                  "rounded-full lg:rounded-full w-[28px] h-[28px] lg:h-[28px] p-0 lg:p-0",
                  dark && "bg-foreground"
                )}
                variant="outline"
              >
                <EllipsisIcon color={dark ? "#fff" : "#232323"} />
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

      <div className="self-start flex pt-[18px] lg:pt-[24px] px-[20px] lg:px-[26px] items-center justify-between">
        <div className="flex flex-col">
          <span
            className={cn("text-[11px] lg:text-[12px]", !dark && "text-muted")}
          >
            Balance
          </span>
          <span className="text-[16px] lg:text-[20px] font-semibold leading-[19px] lg:leading-none">
            {formatCurrency(balance.amount)}
          </span>
        </div>
        <img
          src={dark ? ICON.icons.chipLight : ICON.icons.chipDark}
          alt="credit card chip"
          className="w-[29px] lg:w-[34px] h-[29px] lg:h-[34px]"
        />
      </div>
      <div className="flex justify-between pl-[20px] lg:pl-[26px] pb-[16px] lg:pb-[35px] self-start">
        <div className="flex flex-col">
          <span
            className={cn(
              "text-[10px] lg:text-[12px] uppercase",
              dark ? "opacity-50" : "text-muted"
            )}
          >
            Card holder
          </span>
          <span className="text-[13px] lg:text-[15px] font-semibold leading-[16px] lg:leading-none">
            {name}
          </span>
        </div>
        <div className="flex flex-col mr-[52px] lg:mr-[97px]">
          <span
            className={cn(
              "text-[10px] lg:text-[12px] uppercase",
              dark ? "opacity-50" : "text-muted"
            )}
          >
            Valid thru
          </span>
          <span className="text-[13px] lg:text-[15px] font-semibold leading-[16px] lg:leading-none">
            {formatCardValidity(validity)}
          </span>
        </div>
      </div>
      <div
        className={cn(
          "pl-[20px] lg:pl-[26px] pr-[17px] lg:pr-[24px] py-[16px] lg:py-[20px] flex justify-between items-center",
          dark ? "bg-dark-gradient-2" : "bg-background border-t"
        )}
      >
        <div className="text-[15px] lg:text-[22px] font-semibold leading-4 lg:leading-none">
          {maskCreditCardNumber(number)}
        </div>
        <div className="relative w-[27px] lg:w-[44px] h-[18px] lg:h-[30px]">
          <div
            className={cn(
              "w-[18px] h-[18px] lg:w-[30px] lg:h-[30px] rounded-full opacity-50 absolute left-0",
              dark ? "bg-background" : "bg-muted-secondary"
            )}
          ></div>
          <div
            className={cn(
              "w-[18px] h-[18px] lg:w-[30px] lg:h-[30px] rounded-full opacity-50 absolute right-0",
              dark ? "bg-background" : "bg-muted-secondary"
            )}
          ></div>
        </div>
      </div>
    </Card>
  );
};
