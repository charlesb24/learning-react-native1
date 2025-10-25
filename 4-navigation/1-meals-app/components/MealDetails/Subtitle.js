import { Text, View, StyleSheet } from 'react-native';

export default function Subtitle({ children }) {
  return (
    <View style={ styles.subtitleContainer }>
      <Text style={ styles.subtitle }>{ children }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#e2b497',
    textAlign: 'center',
  },
  subtitleContainer: {
    marginVertical: 4,
    marginHorizontal: 12,
    padding: 6,
    borderBottomColor: '#e2b497',
    borderBottomWidth: 2,
  },
});