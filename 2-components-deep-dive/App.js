import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
  const [ userNumber, setUserNumber ] = useState(-1);
  const [ gameOver, setGameOver ] = useState(true);

  function handleStartGame(number) {
    setUserNumber(number);
    setGameOver(false);
  }

  function handleGameOver() {
    setGameOver(true);
  }

  let currentScreen = <StartGameScreen onConfirm={ handleStartGame } />;

  if (userNumber !== -1) {
    currentScreen = <GameScreen userNumber={ userNumber } onGameOver={ handleGameOver } />;
  }

  if (gameOver && userNumber !== -1) {
    currentScreen = <GameOverScreen />;
  }

  return (
    <LinearGradient colors={ [ Colors.primary700, Colors.secondary500 ] } style={ styles.rootScreen }>
      <StatusBar style="auto" />
      <ImageBackground
        source={ require('./assets/images/background.png') }
        resizeMode="cover"
        style={ styles.rootScreen }
        imageStyle={ styles.backgroundImage }
      >
        <SafeAreaView style={ styles.rootScreen }>
          { currentScreen }
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
