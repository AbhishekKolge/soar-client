import { CartesianGrid, XAxis, YAxis, Area, AreaChart } from "recharts";
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
            <AreaChart
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
              <defs>
                <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D60FF" stopOpacity={0.6} />
                  <stop offset="50%" stopColor="#2D60FF" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="balance"
                type="natural"
                fill="url(#fillBalance)"
                fillOpacity={0.4}
                stroke="var(--color-balance)"
                strokeWidth={3}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <EmptyChart />
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceHistory;
