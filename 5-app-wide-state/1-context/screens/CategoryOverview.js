import { useLayoutEffect } from 'react';

import { CATEGORIES, MEALS } from '../data/example-data';
import MealList from '../components/MealList/MealList';

export default function CategoryOverview({ navigation, route }) {
  const { categoryId } = route.params;

  const mealsInCategory = MEALS.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: CATEGORIES.find(category => category.id === categoryId).title,
    });
  }, [ categoryId, navigation ]);

  return (
    <MealList meals={ mealsInCategory } />
  );
}
