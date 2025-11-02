import axios from 'axios';
import { API_KEY } from '../secrets';

export async function authenticate(mode, email, password) {
  const res = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${ mode }?key=${ API_KEY }`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  return res.data.idToken;
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}