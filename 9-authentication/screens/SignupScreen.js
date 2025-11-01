import { useState } from 'react';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { createUser } from '../util/auth';

export default function SignupScreen() {
  const [ isAuthenticating, setIsAuthenticating ] = useState(false);

  async function handleSignup({ email, password }) {
    setIsAuthenticating(true);
    await createUser(email, password);
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={ handleSignup } />;
}