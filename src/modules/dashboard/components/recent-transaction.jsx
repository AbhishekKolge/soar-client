import { Card, CardContent } from "@/components/ui/card";
import { useGetTransactionQuery } from "../../../features/transaction/transaction-api-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { ICON } from "../../../utils/constants";
import { formatCurrency, formatUtcDate } from "../../../utils/helper";
import { cn } from "@/lib/utils";
import { EmptyChart } from "../charts";

const RecentTransaction = () => {
  const { data: transactionData, isLoading: transactionIsLoading } =
    useGetTransactionQuery({});

  const transactions = transactionData?.results;

  return (
    <Card className="border-0">
      <CardContent className="py-[20px] px-[18px] lg:p-[25px] aspect-[325/214] lg:aspect-[350/235]">
        {transactionIsLoading ? (
          <Skeleton className="w-full h-full rounded-[15px] lg:rounded-[25px]" />
        ) : transactions?.length ? (
          <div className="overflow-y-scroll h-full flex flex-col gap-[12px] lg:gap-[10px]">
            {transactions.map((transaction) => {
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
                  className="flex items-center gap-[15px] lg:gap-[17px]"
                >
                  <img
                    src={getIcon()}
                    className="w-[50px] h-[50px] lg:w-[55px] lg:h-[55px]"
                    alt="test"
                  />
                  <div className="flex flex-col gap-[4px] lg:gap-[7px] leading-4 lg:leading-none">
                    <span className="font-medium text-[14px] lg:text-[16px]">
                      {transaction.recipient}
                    </span>
                    <span className="text-muted text-[12px] lg:text-[15px]">
                      {formatUtcDate(transaction.createdAt)}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "ml-auto text-[11px] lg:text-[16px] text-right font-medium",
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
        ) : (
          <EmptyChart message="No transactions found" />
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransaction;
