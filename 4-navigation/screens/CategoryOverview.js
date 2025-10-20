import { View, Text, StyleSheet } from 'react-native';

import { MEALS } from '../data/example-data';

export default function CategoryOverview() {
  return (
    <View style={ styles.container }>
      <Text>List of Meals</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});