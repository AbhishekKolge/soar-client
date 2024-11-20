import { Badge } from "@/components/ui/badge";
import TransactionColumnHeader from "./transaction-column-header";
import { formatCurrency, formatLocalTime } from "../../../utils/helper";
import { truncate } from "lodash";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const TransactionColumn = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <TransactionColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-y-2 flex-col">
          <span className="truncate font-medium">
            {formatLocalTime(row.getValue("createdAt"))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "recipient",
    header: ({ column }) => (
      <TransactionColumnHeader column={column} title="Recipient" />
    ),
    cell: ({ row }) => {
      const recipient = row.getValue("recipient");
      return <div className="flex space-x-1 items-center">{recipient}</div>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <TransactionColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.getValue("category");

      return (
        <div className="flex space-x-1 items-center">
          <Badge className="capitalize text-neutral-950 text-xs font-normal bg-muted hover:bg-muted/8 text-background">
            {category}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "method",
    header: ({ column }) => (
      <TransactionColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const method = row.getValue("method");
      return (
        <div className="flex space-x-1 items-center">
          <Badge
            className={cn(
              "capitalize text-neutral-950 text-xs font-normal",
              method === "Debit"
                ? "bg-success-foreground hover:bg-success-foreground"
                : "bg-destructive-foreground hover:bg-destructive-foreground"
            )}
          >
            {method}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <TransactionColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("amount");
      const isDebited = row.original.method === "Debit";

      return (
        <div className="flex space-x-1 items-center">
          <span className={cn(isDebited ? "text-destructive" : "text-success")}>
            {`${isDebited ? "-" : "+"} ${formatCurrency(amount)}`}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "note",
    header: ({ column }) => (
      <TransactionColumnHeader column={column} title="Note" />
    ),
    cell: ({ row }) => {
      const note = row.getValue("note");

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex space-x-1 text-ellipsis overflow-hidden items-center">
              {truncate(note, {
                length: 50,
              })}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-[250px]">{note}</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
];

export default TransactionColumn;
