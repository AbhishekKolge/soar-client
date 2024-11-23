import { useGetCreditCardQuery } from "../../../features/credit-card/credit-card-api-slice";
import { ROUTES } from "../../../utils/constants";
import {
  EmptyCard,
  PlaceholderCard,
  QuickTransfer,
  RecentTransaction,
  WidgetContainer,
  Loading,
} from "../components";
import { CreditCard } from "../../../components/ui/credit-card";
import { getColorBasedOnCardNumber } from "../../../utils/helper";
import { BalanceHistory, ExpenseStatistics, WeeklyActivity } from "../charts";

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
    <div className="grid w-full gap-[22px] lg:gap-x-[30px] lg:gap-y-[24px] xl:grid-cols-12">
      <div className="xl:col-span-8">
        <WidgetContainer title="My Cards" detailsTo={ROUTES.creditCardList}>
          <div className="flex gap-[20px] lg:gap-[30px] w-full overflow-x-scroll">
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
      <div className="xl:col-span-4">
        <WidgetContainer
          title="Recent Transaction"
          detailsTo={ROUTES.transactionList}
        >
          <RecentTransaction />
        </WidgetContainer>
      </div>
      <div className="xl:col-span-8">
        <WidgetContainer title="Weekly Activity">
          <WeeklyActivity />
        </WidgetContainer>
      </div>
      <div className="xl:col-span-4">
        <WidgetContainer title="Expense Statistics">
          <ExpenseStatistics />
        </WidgetContainer>
      </div>
      <div className="xl:col-span-12 2xl:col-span-5">
        <WidgetContainer title="Quick Transfer">
          <QuickTransfer />
        </WidgetContainer>
      </div>
      <div className="xl:col-span-12 2xl:col-span-7">
        <WidgetContainer title="Balance History">
          <BalanceHistory />
        </WidgetContainer>
      </div>
    </div>
  );
};

export default Dashboard;
