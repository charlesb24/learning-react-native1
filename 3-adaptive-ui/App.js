import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
  const [ userNumber, setUserNumber ] = useState(-1);
  const [ guessCount, setGuessCount ] = useState(0);
  const [ gameOver, setGameOver ] = useState(true);

  const [ loadedFonts] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  if (!loadedFonts) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  function handleStartGame(number) {
    setUserNumber(number);
    setGameOver(false);
  }

  function handleGameOver(guessCount) {
    setGuessCount(guessCount);
    setGameOver(true);
  }

  function handleStartNewGame() {
    setUserNumber(-1);
    setGuessCount(0);
    setGameOver(false);
  }

  let currentScreen = <StartGameScreen onConfirm={ handleStartGame } />;

  if (userNumber !== -1) {
    currentScreen = <GameScreen userNumber={ userNumber } onGameOver={ handleGameOver } />;
  }

  if (gameOver && userNumber !== -1) {
    currentScreen = <GameOverScreen userNumber={ userNumber } guessCount={ guessCount } onStartNewGame={ handleStartNewGame } />;
  }

  return (
    <LinearGradient colors={ [ Colors.primary700, Colors.secondary500 ] } style={ styles.rootScreen }>
      <StatusBar style="light" />
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
