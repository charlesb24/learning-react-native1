import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/styles';
import ExpensesContextProvider, { ExpensesContext } from './store/expenses-context';
import { fetchExpenses } from './util/http';
import LoadingOverlay from './components/UI/LoadingOverlay';
import ErrorOverlay from './components/UI/ErrorOverlay';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BottomTabsNavigator() {
  const [ error, setError ] = useState(null);
  const [ isFetching, setIsFetching ] = useState(true);
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);

      try {
        const expenses = await fetchExpenses();

        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses.');
      }

      setIsFetching(false);

    }

    getExpenses();
  }, []);

  function handleError() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={ error } onConfirm={ handleError } />
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <BottomTabs.Navigator
      id="main-bottom-tabs"
      initialRouteName="AllExpenses"
      screenOptions={ ({ navigation }) => ( {
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: Colors.primary500, paddingTop: 4 },
        tabBarActiveTintColor: Colors.accent500,
        headerRight: ({ tintColor }) =>
          <IconButton
            icon="add"
            size={ 24 }
            color={ tintColor }
            onPress={ navigation.navigate.bind(this, 'ManageExpense') }
          />,
      } ) }>
      <BottomTabs.Screen
        name="AllExpenses"
        component={ AllExpenses }
        options={ {
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={ color } size={ size } />,
        } }
      />
      <BottomTabs.Screen
        name="RecentExpenses"
        component={ RecentExpenses }
        options={ {
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" color={ color } size={ size } />,
        } }
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator id="main-stack" screenOptions={ {
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: 'white',
          } }>
            <Stack.Screen
              name="ListExpenses"
              component={ BottomTabsNavigator }
              options={ {
                headerShown: false,
              } }
            />
            <Stack.Screen name="ManageExpense" component={ ManageExpense } options={ {
              presentation: 'modal',
            } } />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
