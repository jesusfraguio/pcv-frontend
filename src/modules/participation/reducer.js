import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    participationsSearch: null,
};

const participationsSearch = (state = initialState.participationsSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_MYPARTICIPATIONS_COMPLETED:
            return action.participationsSearch;

        case actionTypes.CLEAR_PARTICIPATIONS_SEARCH:
            return initialState.participationsSearch;

        default:
            return state;

    }
}

const reducer = combineReducers({
    participationsSearch
});

export default reducer;