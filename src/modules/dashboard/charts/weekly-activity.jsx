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
import { useState } from "react";
import { useBreakpoint } from "../../../utils/hooks";
import { useEffect } from "react";

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
  const [barSize, setBarSize] = useState(18);
  const [barGap, setBarGap] = useState(18);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    if (isMobile) {
      setBarSize(7);
      setBarGap(4);
    } else {
      setBarSize(18);
      setBarGap(18);
    }
  }, [isMobile]);

  const { data: activityData, isLoading: activityIsLoading } =
    useGetWeeklyActivityQuery({});

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
    <Card className="border-0">
      <CardContent className="px-[20px] lg:px-[30px] pt-[9px] lg:pt-[30px] pb-[17px] lg:pb-[28px] sm:aspect-auto lg:aspect-[730/322]">
        {activityIsLoading ? (
          <Skeleton className="rounded-[15px] lg:rounded-[25px] w-full h-[254px] lg:h-full" />
        ) : activityData?.activity?.length ? (
          <ChartContainer
            className="w-full max-h-[254px] lg:max-h-none lg:w-full lg:h-full"
            config={chartConfig}
          >
            <BarChart
              barSize={barSize}
              barGap={barGap}
              accessibilityLayer
              data={activityData.activity}
              margin={{
                left: -20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={getShortDay}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[min, max]}
                interval="preserveStartEnd"
                tickCount={7}
                tickFormatter={(value) => value.toFixed(0)}
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
          <EmptyChart message="No weekly activity found" />
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyActivity;
