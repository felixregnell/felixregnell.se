import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction,  AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

import { Business, BusinessCategory, Transaction } from "@/models/expenses/transaction";

export function mockData(): Transaction[] {
    return [
        new Transaction(new Date("2025/10/09"), 1000, new Business("Ica", BusinessCategory.Groceries)),
        new Transaction(new Date("2025/10/08"), 2000, new Business("Coop", BusinessCategory.Groceries)),
        new Transaction(new Date("2025/10/07"), 3000, new Business("Willys", BusinessCategory.Groceries)),
        new Transaction(new Date("2025/10/06"), 1000, new Business("Lidl", BusinessCategory.Groceries)),
        new Transaction(new Date("2025/10/05"), 1500, new Business("Hemköp", BusinessCategory.Groceries)),
        new Transaction(new Date("2025/10/04"), 600, new Business("Systemet", BusinessCategory.Groceries)),
        new Transaction(new Date("2025/10/03"), 600, new Business("Grönt & Gott", BusinessCategory.Restaurants)),
        new Transaction(new Date("2025/10/02"), 100, new Business("Café Finn Ut", BusinessCategory.Restaurants)),
        new Transaction(new Date("2025/10/02"), 20000, new Business("Vietnam", BusinessCategory.Travel)),
        new Transaction(new Date("2025/10/02"), 15000, new Business("Italien", BusinessCategory.Travel)),
        new Transaction(new Date("2025/10/02"), 13000, new Business("Spanien", BusinessCategory.Travel)),
    ];
}

type PropType = {
    setUnfilteredTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
};

function ExpensesFileUpload({setUnfilteredTransactions}: PropType) {
    return (
        <Card>
            <form onSubmit={(e) => {
                e.preventDefault();
                const newUnfilteredTransactions = mockData();
                setUnfilteredTransactions(newUnfilteredTransactions);
            }}>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Not implemented, added mock data instead.</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction>
                                Ok
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Button className="ml-3" type="submit">Upload file</Button>
            </form>
        </Card>
    );
}

export default ExpensesFileUpload