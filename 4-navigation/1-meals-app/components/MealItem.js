import { Text, View, StyleSheet, Pressable, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Details from './Details';

export default function MealItem({ id, title, duration, complexity, affordability, imageUrl }) {
  const navigation = useNavigation();

  return (
    <View style={ styles.container }>
      <Pressable
        android_ripple={ { color: '#ccc' } }
        style={ ({ pressed }) => pressed ? styles.buttonPressed : null }
        onPress={ navigation.navigate.bind(this, 'MealDetails', { mealId: id }) }
      >
        <View style={ styles.innerContainer }>
          <View>
            <Image source={ { uri: imageUrl } } style={ styles.image } />
            <Text style={ styles.title }>{ title }</Text>
          </View>
          <Details
            duration={ duration }
            complexity={ complexity }
            affordability={ affordability }
          />
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
});