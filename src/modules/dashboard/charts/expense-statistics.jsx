import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useGetExpenseStatisticsQuery } from "../../../features/analytics/analytics-api-slice";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyChart from "./empty-chart";
import { RADIAN, TRANSACTION_CATEGORY_FORMAT } from "../../../utils/constants";
import { calculateSliceOffset } from "../../../utils/helper";
import { ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
  INVESTMENT: {
    label: "Investment",
    color: "hsl(var(--chart-1))",
  },
  OTHERS: {
    label: "Others",
    color: "hsl(var(--chart-2))",
  },
  ENTERTAINMENT: {
    label: "Entertainment",
    color: "hsl(var(--chart-3))",
  },
  BILL_EXPENSE: {
    label: "Bill Expense",
    color: "hsl(var(--chart-4))",
  },
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percentage,
  category,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const centerX = cx + radius * Math.cos(-midAngle * RADIAN);

  return (
    <text
      x={centerX}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontWeight="bold"
    >
      <tspan x={centerX} fontSize={13} fill="hsla(var(--background))">
        {`${percentage.toFixed(2)}%`}
      </tspan>
      <tspan
        x={centerX}
        dy="1.4em"
        fontSize={11}
        fill="hsla(var(--background))"
      >
        {TRANSACTION_CATEGORY_FORMAT[category]}
      </tspan>
    </text>
  );
};

const ExpenseStatistics = () => {
  const { data: expenseStatisticsData, isLoading: expenseStatisticsIsLoading } =
    useGetExpenseStatisticsQuery({});

  const chartData = expenseStatisticsData?.statistics?.map((data) => {
    return {
      ...data,
      percentage: +data.percentage,
      fill: `var(--color-${data.category})`,
    };
  });

  return (
    <Card className="border-0">
      <CardContent className="p-0 lg:p-[30px] xl:aspect-[350/322] flex">
        {expenseStatisticsIsLoading ? (
          <Skeleton className="w-full h-full min-h-[270px]" />
        ) : chartData?.length ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto w-full max-w-[269px] lg:max-w-none aspect-square lg:aspect-auto min-h-[270px] [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <Pie
                data={chartData}
                labelLine={false}
                label={renderCustomizedLabel}
                dataKey="percentage"
                animationDuration={0}
              >
                {chartData.map((entry, index) => {
                  const startAngle = (index * 360) / chartData.length;
                  const endAngle = ((index + 2) * 360) / chartData.length;
                  const { dx, dy } = calculateSliceOffset(startAngle, endAngle);

                  return (
                    <Cell
                      key={`cell-${index}`}
                      transform={`translate(${dx}, ${dy})`}
                    />
                  );
                })}
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <EmptyChart message="No expenses found" />
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseStatistics;
