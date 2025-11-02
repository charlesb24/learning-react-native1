import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { login } from '../util/auth';
import { AuthContext } from '../store/auth-context';

export default function LoginScreen() {
  const authCtx = useContext(AuthContext);
  const [ isAuthenticating, setIsAuthenticating ] = useState(false);

  async function handleLogin({ email, password }) {
    setIsAuthenticating(true);

    try {
      const token = await login(email, password);

      authCtx.authenticate(token);
    } catch (e) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );

      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin={ true } onAuthenticate={ handleLogin } />;
}