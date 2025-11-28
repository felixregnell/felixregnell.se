import { type Transaction, type BusinessCategorySummary } from "@/models/expenses/transaction";

import { Pie, PieChart } from "recharts"

import type { ChartConfig } from "@/components/ui/chart"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const colors = [
    "#fb923c", // Lighter Orange
    "#6366f1", // Indigo
    "#ec4899", // Pink
    "#facc15", // Yellow
    "#818cf8", // Lighter Indigo
    "#10b981", // Green
    "#f472b6", // Lighter Pink
    "#fde047", // Lighter Yellow
    "#f97316", // Orange
    "#34d399", // Lighter Green
];

type ChartDataEntry = {
    business: string;
    amount: number;
    fill: string;
};

type ChartConfigEntry = {
    label: string
    color: string
}

type ChartPieLabelType = {
    chartConfig: ChartConfig;
    chartData: ChartDataEntry[];
};

function convertToChartConfig(entries: ChartConfigEntry[]): ChartConfig {
    return entries.reduce((acc, { label, color }): ChartConfig => {
        acc[label] = { label, color }
        return acc
    }, {} as ChartConfig)
}

// TODO: make transactions ? such that showBusiness is unnecessary
function generateChartConfig(
    transactions: Transaction[],
    summaries: BusinessCategorySummary[],
    showCategories: boolean): ChartConfig {
    let entries: ChartConfigEntry[];
    if (!showCategories) {
        entries = transactions.map((transaction, index) => ({
            label: transaction.business.name,
            color: colors[index % colors.length],
        } satisfies ChartConfigEntry))
    } else {
        entries = summaries.filter((summary) => summary.amount > 0).map((summary, index) => ({
            label: summary.categoryName,
            color: colors[index % colors.length],
        } satisfies ChartConfigEntry))
    }

    return convertToChartConfig(entries);
}

// TODO: make transactions ? such that showBusiness is unnecessary
function generateChartData(
    transactions: Transaction[],
    summaries: BusinessCategorySummary[],
    showBusinessCategories: boolean): ChartDataEntry[] {

    if (!showBusinessCategories) {
        return transactions.map((transaction, index) => ({
            business: transaction.business.name,
            amount: transaction.amount,
            fill: colors[index % colors.length],
        } satisfies ChartDataEntry));
    } else {
        return summaries.filter((summary) => summary.amount > 0).map((summary, index) => ({
            business: summary.categoryName,
            amount: summary.amount,
            fill: colors[index % colors.length],
        } satisfies ChartDataEntry))
    }
}

function ExpensesPieChart({ chartConfig, chartData }: ChartPieLabelType) {
    return (
        <ChartContainer
            config={chartConfig}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto w-full max-w-[500px] h-[250px]"
        >
            {
                (!chartData?.length)
                    ?
                    <div style={{
                        backgroundImage: "url(/no-data-pic.jpg)",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }} />
                    :

                    <PieChart margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="business"
                            outerRadius="90%"
                            label={({ name }) => `${name}`}
                        />
                    </PieChart>
            }
        </ChartContainer>
    )
}

export { ExpensesPieChart, generateChartConfig, generateChartData }
