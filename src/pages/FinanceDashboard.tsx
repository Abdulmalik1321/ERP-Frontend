/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shadcn/ui/chart";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

const chartData1 = [
  { month: "January", this_year: 186, last_year: 80 },
  { month: "February", this_year: 305, last_year: 200 },
  { month: "March", this_year: 237, last_year: 120 },
  { month: "April", this_year: 73, last_year: 190 },
  { month: "May", this_year: 209, last_year: 130 },
  { month: "June", this_year: 214, last_year: 140 },
  { month: "July", this_year: 250, last_year: 160 },
  { month: "August", this_year: 220, last_year: 175 },
  { month: "September", this_year: 198, last_year: 155 },
  { month: "October", this_year: 270, last_year: 180 },
];

const chartConfig1 = {
  last_year: {
    label: "Last year",
    color: "hsl(var(--chart-1))",
  },
  this_year: {
    label: "This year",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const chartData2 = [
  { month: "January", this_year: 183, last_year: 257 },
  { month: "February", this_year: 204, last_year: 182 },
  { month: "March", this_year: 213, last_year: 186 },
  { month: "April", this_year: 191, last_year: 189 },
  { month: "May", this_year: 138, last_year: 184 },
  { month: "June", this_year: 209, last_year: 128 },
  { month: "July", this_year: 270, last_year: 204 },
  { month: "August", this_year: 142, last_year: 270 },
  { month: "September", this_year: 215, last_year: 274 },
  { month: "October", this_year: 244, last_year: 99 },
];

const chartConfig2 = {
  last_year: {
    label: "Last year",
    color: "hsl(var(--chart-3))",
  },
  this_year: {
    label: "This year",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
export function AreaChartGradient({
  chartData,
  chartConfig,
  gradientIdPrefix,
}: {
  chartData: any;
  chartConfig: any;
  gradientIdPrefix: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - {gradientIdPrefix}</CardTitle>
        <CardDescription>
          Showing total {gradientIdPrefix} to current month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient
                id={`${gradientIdPrefix}_fillThis_year`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-this_year)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-this_year)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id={`${gradientIdPrefix}_fillLast_year`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-last_year)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-last_year)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="last_year"
              type="natural"
              fill={`url(#${gradientIdPrefix}_fillLast_year)`}
              fillOpacity={0.4}
              stroke="var(--color-last_year)"
              stackId="a"
            />
            <Area
              dataKey="this_year"
              type="natural"
              fill={`url(#${gradientIdPrefix}_fillThis_year)`}
              fillOpacity={0.4}
              stroke="var(--color-this_year)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function RadialChartShape() {
  const chartData = [
    { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig}>
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={120}
            outerRadius={160}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[126, 114]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

function DataTable() {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-0">
        <CardTitle>Recent Invoices</CardTitle>
        <CardDescription>January - October 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}

export function DataCard({
  title,
  amount,
  percentage,
}: {
  title: string;
  amount: number;
  percentage: number;
}) {
  return (
    <Card className="flex flex-col gap-2 w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {amount.toLocaleString(undefined, {
          style: "currency",
          currency: "SAR",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </CardContent>
      <CardFooter className="text-sm">
        <CardDescription>
          <span
            className={`${percentage > 0 ? "text-green-500" : "text-red-400"}`}
          >
            {percentage}%
          </span>{" "}
          Over last month
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export function FinanceDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex gap-4">
          <DataCard title="Total transactions" amount={1234} percentage={5.2} />
          <DataCard
            title="Total money received"
            amount={1234}
            percentage={-5.2}
          />
        </div>
        <div className="flex gap-4">
          <DataCard title="Total money spent" amount={1234} percentage={5.2} />
          <DataCard title="Net profit" amount={1234} percentage={5.2} />
        </div>
        <AreaChartGradient
          chartData={chartData1}
          chartConfig={chartConfig1}
          gradientIdPrefix="Income"
        />
        <AreaChartGradient
          chartData={chartData2}
          chartConfig={chartConfig2}
          gradientIdPrefix="Expenses"
        />
        {/* <RadialChartShape /> */}
        <DataTable />
      </div>
    </div>
  );
}
