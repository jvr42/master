import { config } from './../config/config';

import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_UPDATE,
  SIGNUP_STARTED,
  LOGIN_SUCCESS
} from './types';

// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const signupUpdate = ({prop, value}) => {
  return {type: SIGNUP_UPDATE, payload: {prop, value}}
}

export const SignUp = (userInfo) => async dispatch => {
  dispatch({type: SIGNUP_STARTED});

  let response = await fetch(config.API_PROD, {
    method: "POST",
    body: JSON.stringify(userInfo),
    headers: {
      "Content-Type": "application/json"
    }
  });

  let { token, message } = await response.json();

  if (message){
    dispatch({type: SIGNUP_FAIL, payload: message });
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

    dispatch({type: SIGNUP_SUCCESS });
    dispatch({type: LOGIN_SUCCESS, payload: userData });
    return true;
  }
}
