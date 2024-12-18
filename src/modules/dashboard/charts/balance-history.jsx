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
import { formatNumberToShorthand, getShortMonth } from "../../../utils/helper";

const chartConfig = {
  balance: {
    label: "Balance",
    color: "hsl(var(--chart-6))",
  },
};

const BalanceHistory = () => {
  const { data: balanceData, isLoading: balanceIsLoading } =
    useGetBalanceHistoryQuery({});

  return (
    <Card className="border-0">
      <CardContent className="px-[18px] lg:px-[25px] pb-[19px] lg:pb-[30px] pt-[4px] lg:pt-[30px] lg:aspect-[635/276]">
        {balanceIsLoading ? (
          <Skeleton className="rounded-[15px] lg:rounded-[25px] h-[223px] lg:h-full w-full" />
        ) : balanceData?.balance?.length ? (
          <ChartContainer
            className="w-full max-h-[223px] lg:max-h-none lg:h-full"
            config={chartConfig}
          >
            <AreaChart
              accessibilityLayer
              data={balanceData.balance}
              margin={{
                left: -12,
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
                tickMargin={10}
                axisLine={false}
                tickFormatter={getShortMonth}
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
                tickFormatter={formatNumberToShorthand}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <defs>
                <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="20%" stopColor="#2D60FF" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#FFF" stopOpacity={1} />
                  <stop offset="50%" stopColor="#2D60FF" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="balance"
                type="basis"
                fill="url(#fillBalance)"
                fillOpacity={0.4}
                stroke="var(--color-balance)"
                strokeWidth={3}
                dot={false}
                activeDot={false}
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <EmptyChart message="No balance history found" />
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceHistory;
