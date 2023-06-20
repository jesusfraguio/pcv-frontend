import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    volunteerSearch: null,
};

const volunteerSearch = (state = initialState.volunteerSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_VOLUNTEERS_COMPLETED:
            return action.volunteerSearch;

        case actionTypes.CLEAR_VOLUNTEERS_SEARCH:
            return initialState.volunteerSearch;

        default:
            return state;

    }
}

const reducer = combineReducers({
    volunteerSearch,
});

export default reducer;