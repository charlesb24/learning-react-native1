import { Text, View, StyleSheet } from 'react-native';

export default function Details({ duration, complexity, affordability, style, textStyle }) {
  const durationStr = duration >= 60
    ? duration % 60 === 0
      ? `${ duration / 60 }h`
      : `${ duration / 60 }h${ duration % 60 }m`
    : `${ duration }m`;

  return (
    <View style={[ styles.details, style ]}>
      <Text style={[ styles.detailItem, textStyle ]}>{ durationStr }</Text>
      <Text style={[ styles.detailItem, textStyle ]}>{ complexity.toUpperCase() }</Text>
      <Text style={[ styles.detailItem, textStyle ]}>{ affordability.toUpperCase() }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});