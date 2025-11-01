import { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import { Colors } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

export default function ManageExpense({ navigation, route }) {
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ error, setError ] = useState(null);

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
    setIsSubmitting(true);

    try {
      if (isNew) {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      } else {
        expensesCtx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      }

      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  }

  async function handleDeleteExpense() {
    setIsSubmitting(true);

    try {
      await deleteExpense(expenseId);
      expensesCtx.deleteExpense(expenseId);

      navigation.goBack();
    } catch (e) {
      setError('Could not delete expense - please try again later!');
      setIsSubmitting(false);
    }
  }

  function handleError() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={ error } onConfirm={ handleError } />
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
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