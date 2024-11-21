import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetBalanceHistoryQuery } from "../../../features/analytics/analytics-api-slice";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyChart from "./empty-chart";
import { getShortMonth } from "../../../utils/helper";

const chartConfig = {
  balance: {
    label: "Balance",
    color: "hsl(var(--chart-6))",
  },
};

const BalanceHistory = () => {
  const { data: balanceData, isLoading: balanceIsLoading } =
    useGetBalanceHistoryQuery({});

  if (balanceIsLoading) {
    return <Skeleton className="rounded-[15px] aspect-[2.3/1]" />;
  }

  return (
    <Card>
      <CardContent className="py-[30px] lg:py-[30px] px-[25px] lg:px-[25px] aspect-[2.3/1] flex">
        {balanceData?.balance?.length ? (
          <ChartContainer className="w-full h-full" config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={balanceData.balance}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid stroke="#DFE5EE" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={{
                  stroke: "#718EBF",
                  strokeWidth: 1,
                }}
                tick={{
                  fill: "#718EBF",
                  fontSize: 14,
                }}
                axisLine={false}
                tickMargin={10}
                tickFormatter={getShortMonth}
                interval={1}
              />
              <YAxis
                tickLine={{
                  stroke: "#718EBF",
                  strokeWidth: 1,
                }}
                tick={{
                  fill: "#718EBF",
                  fontSize: 13,
                }}
                axisLine={false}
                tickMargin={10}
                interval="balance"
                tickCount={5}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="balance"
                type="natural"
                stroke="var(--color-balance)"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <EmptyChart />
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceHistory;
