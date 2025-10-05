import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [ goals, setGoals ] = useState([]);

  function handleAddGoal(goalText) {
    setGoals(prevState => [
      ...prevState,
      { text: goalText, id: Math.random().toString() }
    ]);
  }

  function handleDeleteGoal(id) {
    setGoals(prevState => prevState.filter(goal => goal.id !== id));
  }

  return (
    <View style={ styles.appContainer }>

      <GoalInput onAddGoal={ handleAddGoal } />

      <View style={ styles.goalsContainer }>
        <Text style={ styles.goalsCaption }>List of goals</Text>
        <FlatList
          data={ goals }
          keyExtractor={ (item, index) => item.id }
          renderItem={ goalInfo => {
            return (
              <GoalItem
                text={ goalInfo.item.text }
                id={ goalInfo.item.id }
                onDeleteGoal={ handleDeleteGoal }
              />
            );
          }}
        />
      </View>

      <StatusBar style="dark" />

    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
  goalsCaption: {
    textAlign: 'center',
  },
});