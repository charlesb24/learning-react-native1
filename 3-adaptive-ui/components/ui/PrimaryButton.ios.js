import { View, Text, Pressable, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

export default function PrimaryButtonIos({ onPress, children }) {
  return (
    <View style={ styles.outerContainer }>
      <Pressable
        onPress={ onPress }
        android_ripple={{ color: Colors.primary600 }}
        style={ ({ pressed }) =>
          pressed
            ? [ styles.pressed, styles.innerContainer ]
            : styles.innerContainer
        }
      >
        <Text style={ styles.text }>{ children }</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  innerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
});