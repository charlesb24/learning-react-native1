import { Text, View, StyleSheet, Pressable, Image, Platform } from 'react-native';

export default function MealItem({ title, duration, complexity, affordability, imageUrl, onPress }) {
  return (
    <View style={ styles.container }>
      <Pressable
        android_ripple={ { color: '#ccc' } }
        style={ ({ pressed }) => pressed ? styles.buttonPressed : null }
        onPress={ onPress }
      >
        <View style={ styles.innerContainer }>
          <View>
            <Image source={ { uri: imageUrl } } style={ styles.image } />
            <Text style={ styles.title }>{ title }</Text>
          </View>
          <View style={ styles.details }>
            <Text style={ styles.detailItem }>{ duration }m</Text>
            <Text style={ styles.detailItem }>{ complexity.toUpperCase() }</Text>
            <Text style={ styles.detailItem }>{ affordability.toUpperCase() }</Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.select({ android: 'hidden', ios: 'visible' }),
  },
  innerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonPressed: {
    opacity: 0.5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    padding: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  }
});