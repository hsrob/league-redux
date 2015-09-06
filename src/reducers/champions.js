import {
    CHAMPION_LOAD,
    CHAMPION_LOAD_SUCCESS,
    CHAMPION_LOAD_FAIL
} from '../actions/actionTypes';

const initialState = {
    loaded: false
};

export default function champions(state = initialState, action = {}) {
    switch (action.type) {
        case CHAMPION_LOAD:
            return {
                ...state,
                loading: true
            };
        case CHAMPION_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.result,
                error: null
            };
        case CHAMPION_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                data: null,
                error: action.error
            };
        default:
            return state;
    }
}

export function isLoaded(globalState) {
    return globalState.champions && globalState.champions.loaded;
}
