import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ExpensesFileUpload from './pages/expenses-file-upload.tsx'
import NotFound from './pages/NotFound.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import ExpenseTracker from './pages/expenses-tracker.tsx'
import IncomeTracker from './pages/income-tracker.tsx'
import ATM from "./pages/ATM.tsx"

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: ExpensesFileUpload },
      { path: 'file-upload', Component: ExpensesFileUpload },
      { path: 'expense-tracker', Component: ExpenseTracker},
      { path: 'income-tracker', Component: IncomeTracker},
      { path: 'ATM', Component: ATM}
    ]
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

// document.documentElement.classList.toggle('dark');

// Export a function to mount the app to a container
export default function mountExpenseTracker(container: HTMLElement) {
  createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);


  // root.render(<App />);
}