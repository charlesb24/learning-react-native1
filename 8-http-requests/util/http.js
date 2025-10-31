import axios from 'axios';

import { FIREBASE_URL } from '../secrets';

export async function storeExpense(expenseData) {
  const res = await axios.post(`${ FIREBASE_URL }/expenses.json`, expenseData);

  return res.data.name;
}

export async function fetchExpenses() {
  const res = await axios.get(`${ FIREBASE_URL }/expenses.json`);

  const expenses = [];

  for (const key in res.data) {
    const expenseObj = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(`${ FIREBASE_URL }/expenses/${ id }.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(`${ FIREBASE_URL }/expenses/${ id }.json`);
}