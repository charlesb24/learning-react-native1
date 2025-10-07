import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [ goals, setGoals ] = useState([]);
  const [ modalIsVisible, setModalIsVisible ] = useState(false);

  function handleShowGoalInputModal() {
    setModalIsVisible(true);
  }

  function handleCancelAddGoal() {
    setModalIsVisible(false)
  }

  function handleAddGoal(goalText) {
    setGoals(prevState => [
      ...prevState,
      { text: goalText, id: Math.random().toString() }
    ]);

    setModalIsVisible(false);
  }

  function handleDeleteGoal(id) {
    setGoals(prevState => prevState.filter(goal => goal.id !== id));
  }

  return (
    <>
      <StatusBar style="dark" />
      <View style={ styles.appContainer }>

        <Button
          title="Add New Goal"
          color="#5e99cc"
          onPress={ handleShowGoalInputModal }
        />

        <GoalInput
          onAddGoal={ handleAddGoal }
          onCancel={ handleCancelAddGoal }
          isVisible={ modalIsVisible }
        />

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

      </View>
    </>
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
    marginTop: 15,
  },
  goalsCaption: {
    textAlign: 'center',
  },
});