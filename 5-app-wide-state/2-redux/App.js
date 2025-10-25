import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import Categories from './screens/Categories';
import CategoryOverview from './screens/CategoryOverview';
import MealDetails from './screens/MealDetails';
import Favorites from './screens/Favorites';
import { store } from './store/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      id="main-drawer"
      initialRouteName="Categories"
      screenOptions={ {
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        sceneStyle: { backgroundColor: '#3f2f25' },
        drawerContentStyle: { backgroundColor: '#341401' },
        drawerActiveTintColor: '#351401',
        drawerActiveBackgroundColor: '#e4baa1',
        drawerInactiveTintColor: 'white',
      } }>
      <Drawer.Screen
        name="Categories"
        component={ Categories }
        options={ {
          title: 'All Categories',
          drawerIcon: ({ color, size }) => <Ionicons name="list" color={ color } size={ size } />,
        } }
      />
      <Drawer.Screen
        name="Favorites"
        component={ Favorites }
        options={ {
          drawerIcon: ({ color, size }) => <Ionicons name="star" color={ color } size={ size } />,
        } }
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={ store }>
        <NavigationContainer>
          <Stack.Navigator
            id="main"
            initialRouteName="Drawer"
            screenOptions={ {
              headerStyle: { backgroundColor: '#351401' },
              headerTintColor: 'white',
              contentStyle: { backgroundColor: '#3f2f25' },
            } }>
            <Stack.Screen name="Drawer" component={ DrawerNavigator } options={ {
              headerShown: false,
            } } />
            <Stack.Screen name="CategoryOverview" component={ CategoryOverview } />
            <Stack.Screen name="MealDetails" component={ MealDetails } />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
