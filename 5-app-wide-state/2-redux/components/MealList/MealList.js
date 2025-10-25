import { FlatList, StyleSheet, View } from 'react-native';

import MealItem from './MealItem';

export default function MealList({ meals }) {

  function renderMealItem({ item }) {
    const mealItemProps = {
      id: item.id,
      title: item.title,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
      imageUrl: item.imageUrl,
    };

    return (
      <MealItem { ...mealItemProps } />
    );
  }

  return (
    <View style={ styles.container }>
      <FlatList
        data={ meals }
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