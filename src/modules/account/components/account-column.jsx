import { getInitials, maskCreditCardNumber } from "../../../utils/helper";
import AccountHeader from "./account-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const accountColumn = [
  {
    accessorKey: "name",
    header: ({ column }) => <AccountHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl;
      const name = row.getValue("name");
      return (
        <div className="flex items-center gap-4">
          <Avatar className="h-[40px] w-[40px]">
            <AvatarImage
              className="object-cover"
              src={imageUrl}
              alt={`@${name}`}
            />
            <AvatarFallback className="uppercase text-background bg-primary">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate font-medium">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "identity",
    header: ({ column }) => <AccountHeader column={column} title="Identity" />,
    cell: ({ row }) => {
      const identity = row.getValue("identity");
      return (
        <div className="flex space-x-1 items-center">{identity || "-"}</div>
      );
    },
  },
  {
    accessorKey: "number",
    header: ({ column }) => (
      <AccountHeader column={column} title="Account Number" />
    ),
    cell: ({ row }) => {
      const number = row.getValue("number");

      return (
        <div className="flex space-x-1 items-center">
          {maskCreditCardNumber(number)}
        </div>
      );
    },
  },
  {
    accessorKey: "bank",
    header: ({ column }) => <AccountHeader column={column} title="Bank" />,
    cell: ({ row }) => {
      const bank = row.getValue("bank");
      return <div className="flex space-x-1 items-center">{bank.name}</div>;
    },
  },
];

export default accountColumn;
