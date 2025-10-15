import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';

import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

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
    <View style={ styles.rootContainer }>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter A Number</InstructionText>
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
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  numberInput: {
    height: 60,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.secondary500,
    borderBottomWidth: 2,
    color: Colors.secondary500,
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