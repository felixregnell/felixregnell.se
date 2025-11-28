import { BusinessCategory, Transaction } from "@/models/expenses/transaction";
import { useNavigate, useOutletContext } from "react-router";

import { ExpensesPieChart, generateChartConfig, generateChartData } from "@/components/expenses/expenses-pie-chart"
import ChooseExpensesFilter from "@/components/expenses/expenses-choose-filter";
import ExpensesTable from "@/components/expenses/expenses-table";

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import { debugConsole } from "@/lib/utils";
import { useState } from "react";

function debugPrintChartConfigGen(transactions: Transaction[], categoryFilter: BusinessCategory) {
    const conf = generateChartConfig(
        transactions,
        Transaction.getBusinessSummaries(transactions),
        categoryFilter === BusinessCategory.All
    )
    console.log("chart conf:")
    debugConsole.log(conf)
    return conf
}

function debugPrintChartDataGen(transactions: Transaction[], categoryFilter: BusinessCategory) {
    const data = generateChartData(
        transactions,
        Transaction.getBusinessSummaries(transactions),
        categoryFilter === BusinessCategory.All
    )
    console.log("chart data:")
    debugConsole.log(data)
    return data
}

type PropType = {
    unfilteredTransactions: Transaction[]
}

function ExpenseTracker() {
    const navigate = useNavigate();
    const { unfilteredTransactions } = useOutletContext<PropType>()
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(unfilteredTransactions)
    const [businessCategoryFilter, setBusinessCategoryFilter] = useState<BusinessCategory>(BusinessCategory.All)

    return (
        <Card className="flex flex-col">
            <CardContent className="flex-1 pb-0">
                <ChooseExpensesFilter
                    unfilteredTransactions={unfilteredTransactions}
                    setFilteredTransactions={setFilteredTransactions}
                    businessCategoryFilter={businessCategoryFilter}
                    setBusinessCategoryFilter={setBusinessCategoryFilter}
                />

                <CardFooter className="flex-col gap-2 text-sm">
                    {!unfilteredTransactions.length ?
                        <Button
                            onClick={() => navigate("/file-upload")}
                            className="ml-3"> Goto Upload file
                        </Button>
                        :
                        <>
                            <div className="flex items-center gap-2 leading-none font-medium">
                                Your Expense distribution (kr)
                            </div>
                            <div className="text-muted-foreground leading-none">
                                {"Hover over the diagram for more information"}
                            </div>
                        </>
                    }
                </CardFooter>
                <ExpensesPieChart
                    chartConfig={debugPrintChartConfigGen(filteredTransactions, businessCategoryFilter)}
                    chartData={debugPrintChartDataGen(filteredTransactions, businessCategoryFilter)}
                />
                <ExpensesTable />
            </CardContent>
        </Card>
    );
}

export default ExpenseTracker