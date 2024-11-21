import { Card, CardContent } from "@/components/ui/card";
import { useGetTransactionQuery } from "../../../features/transaction/transaction-api-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { ICON } from "../../../utils/constants";
import { formatCurrency, formatLocalDate } from "../../../utils/helper";
import { cn } from "@/lib/utils";

const RecentTransaction = () => {
  const { data: transactionData, isLoading: transactionIsLoading } =
    useGetTransactionQuery({});

  if (transactionIsLoading) {
    return <Skeleton className="rounded-[15px]" />;
  }

  const transactions = transactionData?.results;

  return (
    <Card>
      <CardContent className="p-[20px] lg:p-[25px] aspect-[3/2] flex">
        <div className="overflow-scroll flex flex-col gap-2.5 flex-1">
          {transactions?.map((transaction) => {
            const getIcon = () => {
              if (transaction.method === "Debit") {
                return ICON.icons.cards;
              }
              if (transaction.method === "Credit" && !transaction.accountId) {
                return ICON.icons.paypal;
              }

              return ICON.icons.dollar;
            };
            const isDebited = transaction.method === "Debit";
            return (
              <div
                key={transaction.id}
                className="flex items-center gap-[17px]"
              >
                <img src={getIcon()} alt="test" />
                <div className="flex flex-col gap-[7px] leading-4">
                  <span className="font-medium">{transaction.recipient}</span>
                  <span className="text-muted text-[15px]">
                    {formatLocalDate(transaction.createdAt)}
                  </span>
                </div>
                <span
                  className={cn(
                    "ml-auto font-medium",
                    isDebited ? "text-destructive" : "text-success"
                  )}
                >
                  {`${isDebited ? "-" : "+"}${formatCurrency(
                    transaction.amount
                  )}`}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransaction;
