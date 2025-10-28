import { Text, View, StyleSheet } from 'react-native';

import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { Colors } from '../../constants/styles';

export default function ExpensesOutput({ expenses, period, fallbackText }) {
  let content = <Text style={ styles.infoText }>{ fallbackText }</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={ expenses } />;
  }

  return (
    <View style={ styles.container }>
      <ExpensesSummary expenses={ expenses } period={ period } />
      { content }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 0,
    backgroundColor: Colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});