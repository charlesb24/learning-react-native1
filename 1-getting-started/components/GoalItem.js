import { Text, View, Pressable, StyleSheet } from 'react-native';

export default function GoalItem({ text, id, onDeleteGoal }) {
  return (
    <View style={ styles.goalItem }>
      <Pressable
        onPress={ onDeleteGoal.bind(this, id)}
        style={ ({ pressed }) => pressed && styles.pressedItem }
      >
        <Text style={ styles.goalText }>Goal: { text }</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e99cc',
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: '#ffffff',
  },
});