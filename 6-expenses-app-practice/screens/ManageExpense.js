import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
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

  function handleConfirm() {
    if (isNew) {
      expensesCtx.addExpense({ description: 'Test', amount: 19.90, date: new Date('2022-05-20')});
    } else {
      expensesCtx.updateExpense(expenseId, { description: 'Update Test', amount: 29.90, date: new Date('2022-05-20')});
    }

    navigation.goBack();
  }

  function handleDeleteExpense() {
    expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.buttonContainer }>
        <Button onPress={ handleCancel } style={ styles.button } flat={ true }>Cancel</Button>
        <Button onPress={ handleConfirm } style={ styles.button }>{ isNew ? 'Add' : 'Update' }</Button>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary200,
    alignItems: 'center',
  },
});