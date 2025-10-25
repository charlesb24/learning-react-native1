import { useSelector } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';

import MealList from '../components/MealList/MealList';
import { MEALS } from '../data/example-data';

export default function Favorites() {
  const favoritesMealIds = useSelector(state => state.favorites.ids);
  const favoriteMeals = MEALS.filter(meal => favoritesMealIds.includes(meal.id));

  if (favoriteMeals.length === 0) {
    return (
      <View style={ styles.rootContainer }>
        <Text style={ styles.text }>You don't have any favorite meals yet.</Text>
      </View>
    );
  }

  return (
    <MealList meals={ favoriteMeals } />
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});