import { FETCH_WALLET } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
  case FETCH_WALLET:
    return action.payload.data.wallet;
  default:
    return state;
  }
}
