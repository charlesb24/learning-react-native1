import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={ styles.container }>

      <Text style={ styles.styled }>
        Hello World!
      </Text>

      <Button title="Tap me!"/>

      <StatusBar style="auto"/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styled: {
    borderColor: '#000',
    borderWidth: 2,
    margin: 25,
    padding: 10,
  },
});