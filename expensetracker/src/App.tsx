import { useState } from 'react';

import { Outlet, Link } from 'react-router';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Transaction } from './models/expenses/transaction';

function FileUploadNavLink() {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link to="/file-upload">File uploading</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
}

function ExpenseTrackerNavLink() {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link to="expense-tracker">Expense Tracker</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
}

function IncomeTrackerNavLink() {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link to="income-tracker">Income Tracker</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
}

function ATMNavLink() {
    return (
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link to="ATM">ATM in your city</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
}

function AppNavList() {
    return (
        <div>
            <NavigationMenuItem>
                <NavigationMenu>
                    <NavigationMenuList>
                        <FileUploadNavLink />
                        <ExpenseTrackerNavLink />
                        <IncomeTrackerNavLink />
                        <ATMNavLink />
                    </NavigationMenuList>
                </NavigationMenu>
            </NavigationMenuItem>
        </div>
    );
}

function App() {
    const [unfilteredTransactions, setUnfilteredTransactions] = useState<Transaction[]>([]);

    return (
        <div className="grid grid-rows-1 gap-4 max-w-5xl" >
            <h1 className="text-3xl font-bold text-center ">Expense Tracker</h1>
            <AppNavList />
            <Outlet context={{ unfilteredTransactions, setUnfilteredTransactions }} />
        </div>
    );
}

export default App;