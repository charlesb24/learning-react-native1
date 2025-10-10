import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function PrimaryButton({ children }) {

  function handlePress() {
    console.log(`pressed: ${children}`)
  }

  return (
    <View style={ styles.outerContainer }>
      <Pressable
        onPress={ handlePress }
        android_ripple={{ color: '#640233' }}
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
    backgroundColor: '#72063c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
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