import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

function generateRandomBetween(min, max, exclude) {
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  return randNum === exclude
    ? generateRandomBetween(min, max, exclude)
    : randNum;
}

let min = 1;
let max = 100;

export default function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [ currentGuess, setCurrentGuess ] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [ currentGuess, userNumber, onGameOver ]);

  function handleNewGuess(type) {
    if (
      (type === 'lower' && currentGuess < userNumber) ||
      (type === 'higher' && currentGuess > userNumber)
    ) {
      Alert.alert('Don\'t lie!', 'You know the rules, and so do I...', [ { text: 'Sorry!', style: 'cancel' }]);
      return;
    }

    if (type === 'lower') {
      max = currentGuess;
    } else if (type === 'higher') {
      min = currentGuess + 1;
    }

    const newGuess = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(newGuess);
  }

  return (
    <View style={ styles.screen }>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{ currentGuess }</NumberContainer>

      <Card>
        <InstructionText style={ styles.instructionText }>Higher or lower?</InstructionText>
        <View style={ styles.buttonsContainer }>
          <View style={ styles.buttonContainer }>
            <PrimaryButton onPress={ handleNewGuess.bind(this, 'higher') }>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={ styles.buttonContainer }>
            <PrimaryButton onPress={ handleNewGuess.bind(this, 'lower') }>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});