import { config } from './../config/config';

import {
  CREATE_DEBIT,
  CREATE_CREDIT,
  CREATE_CATEGORY
} from './types';


export const createDebit = () => {
  return {
    payload: 'debit',
    type: CREATE_DEBIT
  };
};

export const createCredit = () => {
  return {
    payload: 'credit',
    type: CREATE_CREDIT
  }
};

export const createCategory = (token, id, categoryName) => async dispatch => {

  let response = await fetch(`${config.API_PROD}/${id}/category`, {
    method: "POST",
    body: JSON.stringify({name: categoryName}),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });

  let userData = await response.json();
  userData.categories.reverse();
  
  dispatch({
    type: CREATE_CATEGORY,
    payload: userData
  });
};
