import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

export default function RecentExpenses() {
  return (
    <ExpensesOutput expenses={ [] } period="Last 7 Days" />
  );
}