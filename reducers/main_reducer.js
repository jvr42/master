import {
  CREATE_DEBIT,
  CREATE_CREDIT
} from '../actions/types';

export default function(state = '', action) {
  switch (action.type) {
    case CREATE_DEBIT:
      return action.payload;
    case CREATE_CREDIT:
      return action.payload;
    default:
      return state;
  }
}
