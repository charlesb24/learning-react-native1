import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { Colors } from './constants/styles';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <BottomTabs.Navigator
      id="main-bottom-tabs"
      initialRouteName="AllExpenses"
      screenOptions={ {
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: Colors.primary500, paddingTop: 4 },
        tabBarActiveTintColor: Colors.accent500,
    } } >
      <BottomTabs.Screen
        name="AllExpenses"
        component={ AllExpenses }
        options={ {
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size}) => <Ionicons name="calendar" color={ color } size={ size } />,
        } }
      />
      <BottomTabs.Screen
        name="RecentExpenses"
        component={ RecentExpenses }
        options={ {
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size}) => <Ionicons name="hourglass" color={ color } size={ size } />,
        } }
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator id="main-stack">
          <Stack.Screen
            name="ListExpenses"
            component={ BottomTabsNavigator }
            options={ {
              headerShown: false,
            } }
          />
          <Stack.Screen name="ManageExpense" component={ ManageExpense } />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
