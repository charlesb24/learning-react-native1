import { StatusBar } from 'expo-status-bar';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Categories from './screens/Categories';
import CategoryOverview from './screens/CategoryOverview';
import MealDetails from './screens/MealDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          id="main"
          initialRouteName="Categories"
          screenOptions={ {
            headerStyle: { backgroundColor: '#351401' },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: '#3f2f25' },
        }}>
          <Stack.Screen
            name="Categories"
            component={ Categories }
            options={{
              title: 'All Categories',
            }}
          />
          <Stack.Screen
            name="CategoryOverview"
            component={ CategoryOverview }
          />
          <Stack.Screen
            name="MealDetails"
            component={ MealDetails }
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
