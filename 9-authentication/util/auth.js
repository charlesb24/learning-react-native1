import axios from 'axios';
import { API_KEY } from '../secrets';

export async function createUser(email, password) {
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ API_KEY }`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
}