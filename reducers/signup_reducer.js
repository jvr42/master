import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_UPDATE,
  SIGNUP_STARTED
} from '../actions/types';

let INITIAL_STATE = {
  name: '',
  lastname: '',
  email: '',
  password: '',
  password2: '',
  loading: false,
  errMessage: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_STARTED:
      return { ...state, loading: true, errMessage: '' }
    case SIGNUP_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SIGNUP_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case SIGNUP_FAIL:
      return { ...state, errMessage: action.payload, loading: false };
    default:
      return state;
  }
}
