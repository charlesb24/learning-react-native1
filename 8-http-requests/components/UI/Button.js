import { Pressable, Text, View, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

export default function Button({ flat = false, style, onPress, children }) {
  return (
    <View style={ style }>
      <Pressable onPress={ onPress } style={ ({ pressed }) => pressed && styles.pressed }>
        <View style={[ styles.button, flat && styles.flat ]}>
          <Text style={[ styles.buttonText, flat && styles.flatText ]}>{ children }</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: Colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: Colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
});