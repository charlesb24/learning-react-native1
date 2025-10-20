import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Categories from './screens/Categories';
import CategoryOverview from './screens/CategoryOverview';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator id="main" initialRouteName="Categories">
          <Stack.Screen name="Categories" component={ Categories } />
          <Stack.Screen name="Category Overview" component={ CategoryOverview } />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({

});
