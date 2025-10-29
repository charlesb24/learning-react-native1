import { Text, TextInput, View, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

export default function Input({ label, isValid, style, inputConfig }) {
  return (
    <View style={[ styles.container, style ]}>
      <Text style={[ styles.label, !isValid && styles.invalidLabel ]}>{ label }</Text>
      <TextInput style={[ styles.input, inputConfig?.multiline && styles.inputMultiline, !isValid && styles.invalidInput ]} { ...inputConfig } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    color: Colors.primary100,
    marginBottom: 4,
  },
  input: {
    color: Colors.primary700,
    backgroundColor: Colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: Colors.error50,
  },
  invalidInput: {
    backgroundColor: Colors.error50,
  },
});