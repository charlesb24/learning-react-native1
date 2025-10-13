import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

function generateRandomBetween(min, max, exclude) {
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  return randNum === exclude
    ? generateRandomBetween(min, max, exclude)
    : randNum;
}

export default function GameScreen({ userNumber }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [ currentGuess, setCurrentGuess ] = useState(initialGuess);

  return (
    <View style={ styles.screen }>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{ currentGuess }</NumberContainer>

      <View>
        <Text>Higher or lower?</Text>
      </View>

      <View>
        <PrimaryButton onPress={() => console.log('+')}>
          +
        </PrimaryButton>
        <PrimaryButton onPress={() => console.log('-')}>
          -
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});