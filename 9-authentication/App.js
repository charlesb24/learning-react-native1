import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

import IconButton from './components/UI/IconButton';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function AuthStack() {
  return (
    <Stack.Navigator
      id="login-stack"
      screenOptions={ {
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      } }
    >
      <Stack.Screen name="Login" component={ LoginScreen } />
      <Stack.Screen name="Signup" component={ SignupScreen } />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator
      id="content-stack"
      screenOptions={ {
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        headerRight: ({ tintColor }) => <IconButton onPress={ authCtx.logout } icon="exit" color={ tintColor } size={ 24 } />
      } }
    >
      <Stack.Screen name="Welcome" component={ WelcomeScreen } />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      { !authCtx.isAuthenticated && <AuthStack /> }
      { authCtx.isAuthenticated && <AuthenticatedStack /> }
    </NavigationContainer>
  );
}

function Root() {
  const [ isTryingToLogin, setIsTryingToLogin ] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getStoredToken() {
      const storedToken = await AsyncStorage.getItem('auth-token');

      if (storedToken) authCtx.authenticate(storedToken);

      setIsTryingToLogin(false);
    }

    getStoredToken();
  }, []);

  useEffect(() => {
    if (!isTryingToLogin) SplashScreen.hideAsync();
  }, [isTryingToLogin]);

  if (isTryingToLogin) return null;

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}