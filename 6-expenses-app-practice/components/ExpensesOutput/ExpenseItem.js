import { Pressable, Text, View, StyleSheet} from 'react-native';

import { Colors } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

export default function ExpenseItem({ id, amount, date, description }) {
  return (
    <Pressable onPress={ console.log.bind(this, id) }>
      <View style={ styles.container }>
        <View>
          <Text style={ [ styles.description, styles.textBase ] }>{ description }</Text>
          <Text style={ styles.textBase }>{ getFormattedDate(date) }</Text>
        </View>
        <View style={ styles.amountContainer }>
          <Text style={ styles.amount }>${ amount.toFixed(2) }</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: Colors.primary500,
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  textBase: {
    color: Colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amount: {
    color: Colors.primary500,
    fontWeight: 'bold',
  },
});