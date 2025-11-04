import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BASE_URL } from '../secrets';
import { AuthContext } from '../store/auth-context';

export default function WelcomeScreen() {
  const [ fetchedMessage, setFetchedMessage ] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${ BASE_URL }/message.json?auth=${ token }`)
      .then(res => {
        setFetchedMessage(res.data);
      });
  }, [ token ]);

  return (
    <View style={ styles.rootContainer }>
      <Text style={ styles.title }>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{ fetchedMessage }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});