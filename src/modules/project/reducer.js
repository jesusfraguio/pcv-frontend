import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    cachedData : null
};

const cachedData = (state = initialState.cachedData, action) => {

    switch (action.type) {

        case actionTypes.UPDATE_CACHED_DATA:
            return action.cachedData;

        default:
            return state;

    }

}

const reducer = combineReducers({
    cachedData
});

export default reducer;
