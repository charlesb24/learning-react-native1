import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [ action.payload, ...state ];
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
  const [ expensesState, dispatch ] = useReducer(expensesReducer, []);

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses })
  }

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
    setExpenses,
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