import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {
  const [ goalText, setGoalText ] = useState('');
  const [ goals, setGoals ] = useState([]);

  function handleGoalInput(text) {
    setGoalText(text);
  }

  function handleAddGoal() {
    setGoals(prevState => [ ...prevState, goalText ]);
    setGoalText('');
  }

  return (
    <View style={ styles.appContainer }>

      <View style={ styles.inputContainer }>
        <TextInput
          style={ styles.textInput }
          placeholder="Your course goal!"
          onChangeText={ handleGoalInput }
          value={ goalText }
        />
        <Button title="Add Goal" onPress={ handleAddGoal } />
      </View>

      <View style={ styles.goalsContainer }>
        <Text>List of goals...</Text>
        { goals.map((goal, index) => (
          <View key={ goal + index.toString() }>
            <Text>{ goal }</Text>
          </View>
        ))}
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
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8
  },
  goalsContainer: {
    flex: 5,
  },
});