import { FlatList } from 'react-native';

import ExpenseItem from './ExpenseItem';

export default function ExpensesList({ expenses }) {

  function renderExpenseItem(data) {
    return (
      <ExpenseItem { ...data.item } />
    );
  }

  return (
    <FlatList
      data={ expenses }
      keyExtractor={ item => item.id }
      renderItem={ renderExpenseItem }
    />
  );
}