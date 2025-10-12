import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';

export default function StartGameScreen({ onConfirm }) {
  const [ inputNum, setInputNum ] = useState('');

  function handleInputNumber(num) {
    setInputNum(num);
  }

  function handleConfirm() {
    const num = parseInt(inputNum);

    if (isNaN(num) || num <= 0 || num >= 100) {
      Alert.alert(
        'Invalid Input!',
        'Please enter a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: handleReset }]
      );

      return;
    }

    onConfirm(num);
  }

  function handleReset() {
    setInputNum('');
  }

  return (
    <View style={ styles.inputContainer }>
      <TextInput
        style={ styles.numberInput }
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={ false }
        value={ inputNum }
        onChangeText={ handleInputNumber }
      />
      <View style={ styles.buttonsContainer }>
        <View style={ styles.buttonContainer }>
          <PrimaryButton onPress={ handleReset }>Reset</PrimaryButton>
        </View>
        <View style={ styles.buttonContainer }>
          <PrimaryButton onPress={ handleConfirm }>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: '#3b021f',
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    height: 60,
    width: 50,
    fontSize: 32,
    borderBottomColor: '#ddb52f',
    borderBottomWidth: 2,
    color: '#ddb52f',
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});