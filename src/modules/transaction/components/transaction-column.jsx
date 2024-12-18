import { Badge } from "@/components/ui/badge";
import TransactionColumnHeader from "./transaction-column-header";
import { formatCurrency, formatUtcTime } from "../../../utils/helper";
import { truncate } from "lodash";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const transactionColumn = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <TransactionColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-y-2 flex-col">
          <span className="truncate font-medium">
            {formatUtcTime(row.getValue("createdAt"))}
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

      return <div className="flex space-x-1 items-center">{category}</div>;
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
              method === "Credit"
                ? "bg-success text-background hover:bg-success"
                : "bg-destructive text-background hover:bg-destructive"
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
            {`${isDebited ? "-" : "+"}${formatCurrency(amount)}`}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <TransactionColumnHeader column={column} title="Balance" />
    ),
    cell: ({ row }) => {
      const balance = row.getValue("balance");
      return (
        <div className="flex space-x-1 items-center">
          {formatCurrency(balance)}
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

      return note ? (
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
      ) : (
        <div className="flex space-x-1 items-center">-</div>
      );
    },
  },
];

export default transactionColumn;
