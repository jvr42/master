import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CREATE_CATEGORY
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_CATEGORY:
      return {...state, user: action.payload};
    case LOGIN_SUCCESS:
      return action.payload ;
    case LOGIN_FAIL:
      return {...state, errMessage: action.payload };
    default:
      return state;
  }
}
