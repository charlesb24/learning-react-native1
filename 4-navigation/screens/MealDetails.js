import { useLayoutEffect } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

import Details from '../components/Details';
import { MEALS } from '../data/example-data';

export default function MealDetails({ navigation, route }) {
  const { mealId } = route.params;
  const mealData = MEALS.find(meal => meal.id = mealId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: mealData.title,
    });
  }, [ mealId, mealData, navigation ]);

  return (
    <View style={ styles.container }>
      <Image source={ { uri: mealData.imageUrl } } style={ styles.image } />

      <Text>{ mealData.title }</Text>

      <Details
        duration={ mealData.duration }
        complexity={ mealData.complexity }
        affordability={ mealData.affordability }
      />

      <Text>Ingredients</Text>

      { mealData.ingredients.map(ingredient => <Text key={ ingredient }>{ ingredient }</Text>) }

      <Text>Steps</Text>

      { mealData.steps.map(step => <Text key={ step }>{ step }</Text>) }

    </View>
  );
}

const styles = StyleSheet.create({

});