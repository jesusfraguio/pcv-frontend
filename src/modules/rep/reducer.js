import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    volunteerSearch: null,
    participationHourSearch : null
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

const participationHourSearch = (state = initialState.participationHourSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_HOURS_PARTICIPATION_COMPLETED:
            return action.participationHourSearch;

        case actionTypes.UPDATE_HOURS_PARTICIPATION_SEARCH:
            return [
                ...state,
                action.payload
            ];
        case actionTypes.DELETE_HOURS_PARTICIPATION:
            return [...state.filter(item => item.id !== action.payload)];
        default:
            return state;

    }
}

const reducer = combineReducers({
    volunteerSearch,
    participationHourSearch
});

export default reducer;