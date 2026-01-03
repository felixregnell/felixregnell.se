import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { businessCategoryToString, type Transaction } from "@/models/expenses/transaction";

function TableRepresentation({ unfilteredTransactions }: { unfilteredTransactions: Transaction[] }) {
    return (
        <Table>
            <TableBody>
                {unfilteredTransactions.map(t =>
                    <TableRow key={t.business.name}>
                        <TableCell className="font-normal">
                            {t.business.name + ": " + businessCategoryToString(t.business.type) + " " + t.amount + "kr"}
                        </TableCell>
                        <TableCell className="font-normal text-right tabular-nums">
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

type PropType = {
    unfilteredTransactions: Transaction[]
};

function ExpensesTable( {unfilteredTransactions}: PropType) {
    return <TableRepresentation unfilteredTransactions={unfilteredTransactions} />
}

export default ExpensesTable