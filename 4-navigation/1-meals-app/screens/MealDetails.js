import { useLayoutEffect } from 'react';
import { Image, ScrollView, Text, View, StyleSheet, Button } from 'react-native';

import Details from '../components/Details';
import IconButton from '../components/IconButton';
import Subtitle from '../components/MealDetails/Subtitle';
import List from '../components/MealDetails/List';
import { MEALS } from '../data/example-data';

export default function MealDetails({ navigation, route }) {
  const { mealId } = route.params;
  const mealData = MEALS.find(meal => meal.id === mealId);

  function handlePressHeaderButton() {
    console.log('PRESSED')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: mealData.title,
      headerRight: () => <IconButton icon="star" color="white" onPress={ handlePressHeaderButton } />
    });
  }, [ mealId, mealData, navigation ]);

  return (
    <ScrollView style={ styles.rootContainer }>
      <Image source={ { uri: mealData.imageUrl } } style={ styles.image } />

      <Text style={ styles.title }>{ mealData.title }</Text>

      <Details
        duration={ mealData.duration }
        complexity={ mealData.complexity }
        affordability={ mealData.affordability }
        textStyle={ styles.detailText }
      />

      <View style={ styles.listOuterContainer }>
        <View style={ styles.listContainer }>
          <Subtitle>Ingredients</Subtitle>
          <List data={ mealData.ingredients } />
        </View>

        <View style={ styles.listContainer }>
          <Subtitle>Steps</Subtitle>
          <List data={ mealData.steps } />
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
});