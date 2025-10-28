import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2024-12-19'),
  },
  {
    id: 'e2',
    description: 'Bunches of bananas',
    amount: 5.99,
    date: new Date('2025-03-05'),
  },
  {
    id: 'e3',
    description: 'A new video game',
    amount: 69.99,
    date: new Date('2025-06-11'),
  },
  {
    id: 'e4',
    description: 'A nice book',
    amount: 10.99,
    date: new Date('2025-10-23'),
  },
  {
    id: 'e5',
    description: 'Book protector',
    amount: 18.49,
    date: new Date('2025-10-25'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();

      return [ { id, ...action.payload }, ...state ];
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    case 'UPDATE':
      const existingExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
      const expenseToUpdate = state[existingExpenseIndex];
      const updatedExpense = { ...expenseToUpdate, ...action.payload.data };
      const updatedExpenses = [...state];

      updatedExpenses[existingExpenseIndex] = updatedExpense;

      return updatedExpenses;
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [ expensesState, dispatch ] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={ value }>
      { children }
    </ExpensesContext.Provider>
  )
}