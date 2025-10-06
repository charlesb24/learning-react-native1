import { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Modal } from 'react-native';

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

        <TextInput
          style={ styles.textInput }
          placeholder="Your course goal!"
          onChangeText={ handleGoalInput }
          value={ goalText }
        />

        <View style={ styles.buttonContainer }>
          <View style={ styles.button }>
            <Button title="Cancel" color="#5e99cc" onPress={ onCancel } />
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
    marginBottom: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '100%',
    padding: 8,
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
