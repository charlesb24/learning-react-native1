import { FlatList, StyleSheet } from 'react-native';

import { CATEGORIES } from '../data/example-data';
import CategoryGridTile from '../components/CategoryGridTile';

export default function Categories({ navigation }) {

  function renderCategoryItem(data) {
    return (
      <CategoryGridTile
        title={ data.item.title }
        color={ data.item.color }
        onPress={ navigation.navigate.bind(this, 'Category Overview') }
      />
    );
  }

  return (
    <FlatList
      data={ CATEGORIES }
      keyExtractor={ item => item.id }
      renderItem={ renderCategoryItem }
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({

});