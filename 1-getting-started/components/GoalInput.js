import { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Modal, Image } from 'react-native';

export default function GoalInput({ onCancel, onAddGoal, isVisible }) {
  const [ goalText, setGoalText ] = useState('');

  function handleGoalInput(text) {
    setGoalText(text);
  }

  function handleAddGoal() {
    onAddGoal(goalText);
    setGoalText('');
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={ styles.inputContainer }>

        <Image style={ styles.image } source={ require('../assets/goal.png') } />

        <TextInput
          style={ styles.textInput }
          placeholder="Your course goal!"
          onChangeText={ handleGoalInput }
          value={ goalText }
        />

        <View style={ styles.buttonContainer }>
          <View style={ styles.button }>
            <Button title="Cancel" color="#d81443" onPress={ onCancel } />
          </View>
          <View style={ styles.button }>
            <Button title="Add Goal" color="#5e99cc" onPress={ handleAddGoal } />
          </View>
        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4788b5',
  },
  textInput: {
    borderColor: '#b0d9dd',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#b0d9dd',
    color: '#120438',
    width: '100%',
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    width: '30%',
    marginHorizontal: 8,
  },
});
