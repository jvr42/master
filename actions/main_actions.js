import { config } from './../config/config';

import {
  CREATE_DEBIT,
  CREATE_CREDIT
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
