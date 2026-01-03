import './index.css'
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import ExpenseTracker from './pages/expenses-tracker.tsx'
import ExpensesFileUpload, { mockData } from './pages/expenses-file-upload.tsx'
import { Transaction } from './models/expenses/transaction.tsx'

// Export this function to mount the app to a container
export default function mountExpenseTracker(container: HTMLElement) {

  const root = createRoot(container)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

function App() {
  const [unfilteredTransactions, setUnfilteredTransactions] = useState<Transaction[]>(
    mockData()
  );
  return (
    <div className="grid grid-rows-1 gap-4 max-w-5xl" >
      <h1 className="text-3xl font-bold text-center ">Expense Tracker</h1>
      <ExpensesFileUpload setUnfilteredTransactions={setUnfilteredTransactions} />
      <ExpenseTracker unfilteredTransactions={unfilteredTransactions} />
    </div>
  );
}

mountExpenseTracker(document.getElementById('root')!);