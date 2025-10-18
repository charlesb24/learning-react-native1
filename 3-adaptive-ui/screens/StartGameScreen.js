import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native';

import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

export default function StartGameScreen({ onConfirm }) {
  const [ inputNum, setInputNum ] = useState('');

  const { width, height } = useWindowDimensions();

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

  const marginTop = height < 450 ? 30 : 100;

  return (
    <ScrollView style={ styles.screen }>
      <KeyboardAvoidingView style={ styles.screen } behavior="position">
        <View style={ [ styles.rootContainer, { marginTop } ] }>
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
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