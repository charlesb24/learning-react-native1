import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import { Colors } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

export default function ManageExpense({ navigation, route }) {
  const expensesCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isNew = !expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isNew ? 'Add New Expense' : 'Edit Expense',
    });
  }, [ navigation, isNew ]);

  function handleCancel() {
    navigation.goBack();
  }

  async function handleSubmit(expenseData) {
    if (isNew) {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id });
    } else {
      expensesCtx.updateExpense(expenseId, expenseData);
      await updateExpense(expenseId, expenseData);
    }

    navigation.goBack();
  }

  async function handleDeleteExpense() {
    await deleteExpense(expenseId);
    expensesCtx.deleteExpense(expenseId);

    navigation.goBack();
  }

  return (
    <View style={ styles.container }>

      <ExpenseForm
        defaultValues={ isNew ? null : expensesCtx.expenses.find(expense => expense.id === expenseId) }
        submitLabel={ isNew ? 'Add' : 'Update' }
        onCancel={ handleCancel }
        onSubmit={ handleSubmit }
      />

      { !isNew && (
        <View style={ styles.deleteContainer }>
          <IconButton
            icon="trash"
            color={ Colors.error500 }
            size={ 36 }
            onPress={ handleDeleteExpense }
          />
        </View>
      ) }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary200,
    alignItems: 'center',
  },
});