import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { createUser } from '../util/auth';
import { AuthContext } from '../store/auth-context';

export default function SignupScreen() {
  const authCtx = useContext(AuthContext);
  const [ isAuthenticating, setIsAuthenticating ] = useState(false);

  async function handleSignup({ email, password }) {
    setIsAuthenticating(true);

    try {
      const token = await createUser(email, password);

      authCtx.authenticate(token);
    } catch (e) {
      Alert.alert(
        'Authentication failed!',
        'Could not create new user, please check your inputs and try again later!'
      );

      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={ handleSignup } />;
}