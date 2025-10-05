import { Text, View, Pressable, StyleSheet } from 'react-native';

export default function GoalItem({ text, id, onDeleteGoal }) {
  return (
    <Pressable onPress={ onDeleteGoal.bind(this, id) }>
      <View style={ styles.goalItem }>
        <Text style={ styles.goalText }>Goal: { text }</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e99cc',
  },
  goalText: {
    color: '#ffffff',
  },
});