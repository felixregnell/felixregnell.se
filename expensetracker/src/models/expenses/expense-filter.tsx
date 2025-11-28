import { BusinessCategory, type Transaction } from "./transaction";

enum FilterCondition {
    Date,
    Business,
}

type DateInterval = { from: Date, to: Date }

class ExpenseFilter {
    static applyFilters(
        transactions: Transaction[],
        categoryFilter: BusinessCategory,
        dateFilter: DateInterval
    ): Transaction[] {

        let filteredTransactions = transactions;
        if (dateFilter) {
            const fromDate = dateFilter.from;
            const toDate = dateFilter.to;
            {
                const from = new Date(fromDate);
                const to = new Date(toDate);

                // This might be unnecessary due to "disabled" in DateFilterer
                const start = from <= to ? from : to;
                const end = to >= from ? to : from;

                filteredTransactions = filteredTransactions.filter((tx: any) => {
                    const d = new Date(tx.date);
                    return d >= start && d <= end;
                });
            }
        }

        if (categoryFilter != BusinessCategory.All) {
            filteredTransactions = filteredTransactions.filter(
                (tx: Transaction) => tx.business.type === categoryFilter
            );
        }

        return filteredTransactions
    }
}

export { ExpenseFilter, FilterCondition, type DateInterval };