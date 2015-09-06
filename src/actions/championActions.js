import {
  CHAMPION_LOAD,
  CHAMPION_LOAD_SUCCESS,
  CHAMPION_LOAD_FAIL
} from './actionTypes';

export function load() {
  return {
    types: [CHAMPION_LOAD, CHAMPION_LOAD_SUCCESS, CHAMPION_LOAD_FAIL],
    promise: (client) => client.get('/champions?limit=10')
  };
}
