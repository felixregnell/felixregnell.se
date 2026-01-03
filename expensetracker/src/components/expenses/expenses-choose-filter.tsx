import { BusinessCategory, Transaction } from "@/models/expenses/transaction";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { ExpenseFilter, type DateInterval } from "@/models/expenses/expense-filter";
import { useState, useEffect } from "react";
import type { Property } from 'csstype';
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react"
import { debugConsole } from "@/lib/utils";

function largestInterval(transactions: Transaction[]): DateInterval {
    if (!transactions || !transactions.length) {
        return { from: new Date(), to: new Date() } satisfies DateInterval
    }
    let from: Date = transactions[0].date
    let to: Date = transactions[0].date
    transactions.forEach((t) => {
        const date = t.date
        if (date.getTime() < from.getTime()) {
            from = date
        }
    })

    transactions.forEach((t) => {
        const date = t.date
        if (date.getTime() > to.getTime()) {
            to = date
        }
    })

    return { from, to }
}

function startOfDay(d: Date): Date {
    const copy = new Date(d)
    copy.setHours(0, 0, 0, 0)
    return copy
}


type DateFiltererType = {
    dateFilter: DateInterval
    setDateFilter: React.Dispatch<React.SetStateAction<DateInterval>>
}

function formatLabel(d?: Date) {
    if (!d) return "Pick a date"
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
}

function DateFilterer({ dateFilter, setDateFilter }: DateFiltererType) {
    const fromDate = dateFilter.from
    const toDate = dateFilter.to
    return (
        <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="fromDate">From Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="col-span-2 h-8 justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formatLabel(fromDate)}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={fromDate}
                            onSelect={(d) =>
                                d && setDateFilter(prev => ({ ...prev, from: startOfDay(d) }))
                            }
                            disabled={(d) => (toDate ? d > startOfDay(toDate) : false)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="toDate">To Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="col-span-2 h-8 justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formatLabel(toDate)}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={toDate}
                            onSelect={(d) =>
                                d && setDateFilter(prev => ({ ...prev, to: startOfDay(d) }))
                            }
                            disabled={(d) => (fromDate ? d < startOfDay(fromDate) : false)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

type ButtonColorEntry = {
    name: string,
    color: Property.BackgroundColor,
}

function generateEntries(names: string[], highlightName: string) {
    function backgroundEntry(name: string): ButtonColorEntry {
        return { name, color: 'var(--primary-opaque)' } satisfies ButtonColorEntry
    }

    function highlightedEntry(name: string): ButtonColorEntry {
        return { name, color: 'var(--primary)' } satisfies ButtonColorEntry
    }

    return names.map((name) =>
        name !== highlightName ? backgroundEntry(name) : highlightedEntry(name))
}

type BusinessCategoryFilterType = {
    names: string[]
    colors: ButtonColorEntry[]
    setColors: React.Dispatch<React.SetStateAction<ButtonColorEntry[]>>
    setBusinessCategoryFilter: React.Dispatch<React.SetStateAction<BusinessCategory>>
}
function BusinessCategoryFilterer({
    names,
    colors,
    setColors,
    setBusinessCategoryFilter,
}: BusinessCategoryFilterType) {
    // TODO: use tailwind instead
    const buttonContainerStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", // 3 cols before wraparound 
        gap: "4px",              // space between buttons
    };

    return (
        <div style={buttonContainerStyle}>
            {
                names.map((buttonName, index) => {
                    return (
                        <Button
                            key={buttonName + index}
                            className="px-2"  // horizontal padding 
                            style={{ backgroundColor: colors[index].color }}
                            onClick={() => {
                                // TODO: assert valid index (We now names is correct though so maybe unnecessary)
                                setBusinessCategoryFilter(index as BusinessCategory)
                                setColors(generateEntries(names, buttonName))
                            }}
                        >
                            {buttonName}
                        </Button>
                    )
                })}
        </div >
    );
}

type ChooseExpensesFilterType = {
    unfilteredTransactions: Transaction[]
    setFilteredTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
    businessCategoryFilter: BusinessCategory
    setBusinessCategoryFilter: React.Dispatch<React.SetStateAction<BusinessCategory>>
}
function ChooseExpensesFilter({
    unfilteredTransactions,
    businessCategoryFilter,
    setBusinessCategoryFilter,
    setFilteredTransactions,
}: ChooseExpensesFilterType) {
    // TODO: Filtering-state in local storage
    // TODO: Add a reset button for date-filtering ("Pick largest intervall" or similar)
    const names = Object.keys(BusinessCategory).filter(key => isNaN(Number(key)))
    const [colors, setColors] = useState<ButtonColorEntry[]>(generateEntries(names, names[0]))
    const [dateFilter, setDateFilter] = useState<DateInterval>(largestInterval(unfilteredTransactions))
    useEffect(() => {
        const newFilteredTransactions = ExpenseFilter.applyFilters(
            unfilteredTransactions,
            businessCategoryFilter,
            dateFilter)
        debugConsole.log("filtered transactions:")
        debugConsole.log(newFilteredTransactions)
        setFilteredTransactions(newFilteredTransactions)

    }, [unfilteredTransactions, businessCategoryFilter, dateFilter])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button style={{ background: "var(--secondary)" }}
                    variant="outline">
                    Add Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-2">
                <div className=" grid gap-4">
                    <div className="space-y-2">
                        <p className="text-muted-foreground text-sm">
                            choose category-filter:
                        </p>
                    </div>
                    <BusinessCategoryFilterer
                        names={names}
                        colors={colors}
                        setColors={setColors}
                        setBusinessCategoryFilter={setBusinessCategoryFilter}
                    />
                    <DateFilterer
                        dateFilter={dateFilter}
                        setDateFilter={setDateFilter}
                    />
                </div>
            </PopoverContent>
        </Popover >
    )
}

export default ChooseExpensesFilter;