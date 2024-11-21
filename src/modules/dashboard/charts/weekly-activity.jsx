import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useGetWeeklyActivityQuery } from "../../../features/analytics/analytics-api-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { getShortDay } from "../../../utils/helper";
import _ from "lodash";
import EmptyChart from "./empty-chart";

const chartConfig = {
  debit: {
    label: "Withdraw",
    color: "hsl(var(--chart-1))",
  },
  credit: {
    label: "Deposit",
    color: "hsl(var(--chart-2))",
  },
};

const WeeklyActivity = () => {
  const { data: activityData, isLoading: activityIsLoading } =
    useGetWeeklyActivityQuery({});

  if (activityIsLoading) {
    return <Skeleton className="rounded-[15px] aspect-[2.27/1]" />;
  }

  const max = activityData?.activity?.length
    ? _.max([
        ...activityData.activity.map((item) => +item.debit),
        ...activityData.activity.map((item) => +item.credit),
      ])
    : 0;
  const min = activityData?.activity?.length
    ? _.min([
        ...activityData.activity.map((item) => +item.debit),
        ...activityData.activity.map((item) => +item.credit),
      ])
    : 0;

  return (
    <Card>
      <CardContent className="py-7 lg:py-7 px-[33px] lg:px-[33px] aspect-[2.27/1] flex">
        {activityData?.activity?.length ? (
          <ChartContainer className="w-full h-full" config={chartConfig}>
            <BarChart
              barSize={18}
              barGap={18}
              accessibilityLayer
              data={activityData.activity}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={17}
                axisLine={false}
                tickFormatter={getShortDay}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={17}
                domain={[min, max]}
                interval="preserveStartEnd"
                tickCount={7}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />

              <ChartLegend
                layout="horizontal"
                align="right"
                verticalAlign="top"
                content={<ChartLegendContent />}
              />
              <Bar dataKey="debit" fill="var(--color-debit)" radius={100} />
              <Bar dataKey="credit" fill="var(--color-credit)" radius={100} />
            </BarChart>
          </ChartContainer>
        ) : (
          <EmptyChart />
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyActivity;
