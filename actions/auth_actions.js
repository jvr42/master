import { config } from './../config/config';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_UPDATE,
  LOGIN_STARTED
} from './types';

// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const loginUpdate = ({prop, value}) => {
  return {type: LOGIN_UPDATE, payload: {prop, value}}
}

export const Login = (credentials) => async dispatch => {
  dispatch({type: LOGIN_STARTED});

  let response = await fetch(config.AUTH_LOCAL_PROD, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json"
    }
  });

  let { token, message } = await response.json();

  if (message){
    dispatch({type: LOGIN_FAIL, payload: message });
    return false;
  } else if (token) {

    let response = await fetch(config.API_PROD + '/me', {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
      }
    });

    let userData = await response.json();
    userData.categories.reverse();
    userData.token = token;

    dispatch({type: LOGIN_SUCCESS, payload: userData});
    return true;
  }
}
