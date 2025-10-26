import { Text, View, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

export default function ExpensesSummary({ expenses, period }) {
  const expensesSum = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <View style={ styles.container }>
      <Text style={ styles.periodText }>{ period }</Text>
      <Text style={ styles.sumText }>${ expensesSum.toFixed(2) }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodText: {
    fontSize: 12,
    color: Colors.primary400,
  },
  sumText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary500,
  },
});