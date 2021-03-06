import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_UPDATE,
  LOGIN_STARTED
} from '../actions/types';

let INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  loading: false,
  errMessage: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_STARTED:
      return { ...state, loading: true, errMessage: '' }
    case LOGIN_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOGIN_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_FAIL:
      return { ...state, errMessage: action.payload, loading: false };
    default:
      return state;
  }
}
