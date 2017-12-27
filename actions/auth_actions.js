import { AsyncStorage } from 'react-native';
import { config } from './../config/config';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types';

// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const Login = (credentials) => async dispatch => {

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

    dispatch({type: LOGIN_SUCCESS, payload: {token, user: userData} });
    return true;
  }
}


export const SignUp = (userInfo) => async dispatch => {

  let response = await fetch(config.API_PROD, {
    method: "POST",
    body: JSON.stringify(userInfo),
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

    dispatch({type: LOGIN_SUCCESS, payload: {token, user: userData} });
    return true;
  }
}
