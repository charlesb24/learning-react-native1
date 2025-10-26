import { View, StyleSheet } from 'react-native';

import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { Colors } from '../../constants/styles';

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

export default function ExpensesOutput({ expenses, period }) {
  return (
    <View style={ styles.container }>
      <ExpensesSummary expenses={ DUMMY_EXPENSES } period={ period } />
      <ExpensesList expenses={ DUMMY_EXPENSES } />
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
});