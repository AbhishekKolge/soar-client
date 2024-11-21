import { useGetCreditCardQuery } from "../../../features/credit-card/credit-card-api-slice";
import { ROUTES } from "../../../utils/constants";
import {
  EmptyCard,
  Loading,
  PlaceholderCard,
  QuickTransfer,
  RecentTransaction,
  WidgetContainer,
} from "../components";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard } from "../../../components/ui/credit-card";
import { getColorBasedOnCardNumber } from "../../../utils/helper";

const Dashboard = () => {
  const { data: creditCardData, isLoading: creditCardIsLoading } =
    useGetCreditCardQuery({});

  if (creditCardIsLoading) {
    return <Loading />;
  }

  if (!creditCardData?.creditCards.length) {
    return <EmptyCard />;
  }

  const cards = creditCardData.creditCards.slice(0, 2);
  const showAddCard = cards.length === 1;
  return (
    <div className="w-full grid grid-cols-12 gap-x-[30px] gap-y-6">
      <div className="col-span-8">
        <WidgetContainer title="My Cards" detailsTo={ROUTES.creditCardList}>
          <div className="grid grid-cols-2 gap-x-[30px]">
            {cards.map((card) => {
              const dark = getColorBasedOnCardNumber(card.id);
              return (
                <CreditCard
                  key={card.id}
                  details={card}
                  dark={dark}
                  disableActions
                />
              );
            })}
            {showAddCard && <PlaceholderCard />}
          </div>
        </WidgetContainer>
      </div>
      <div className="col-span-4">
        <WidgetContainer
          title="Recent Transaction"
          detailsTo={ROUTES.transactionList}
        >
          <RecentTransaction />
        </WidgetContainer>
      </div>
      <div className="col-span-8 grid gap-y-5">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="min-h-[322px]" />
      </div>
      <div className="col-span-4 grid gap-y-5">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="min-h-[322px]" />
      </div>
      <div className="col-span-5">
        <WidgetContainer title="Quick Transfer">
          <QuickTransfer />
        </WidgetContainer>
      </div>
      <div className="col-span-7 grid gap-y-5">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="min-h-[276px]" />
      </div>
    </div>
  );
};

export default Dashboard;
