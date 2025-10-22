import { View, StyleSheet, FlatList } from 'react-native';

import { MEALS } from '../data/example-data';
import MealItem from '../components/MealItem';

export default function CategoryOverview({ navigation, route }) {
  const { categoryId } = route.params;

  const mealsInCategory = MEALS.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0);

  function renderMealItem({ item }) {
    const mealItemProps = {
      title: item.title,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
      imageUrl: item.imageUrl,
    }

    return (
      <MealItem { ...mealItemProps } />
    );
  }

  return (
    <View style={ styles.container }>
      <FlatList
        data={ mealsInCategory}
        keyExtractor={ item => item.id }
        renderItem={ renderMealItem }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});