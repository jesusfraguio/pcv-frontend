import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    participationsSearch: null,
    projectVolunteers: null,
    pendingParticipations: null
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

const projectVolunteers = (state = initialState.projectVolunteers, action) => {

    switch (action.type) {

        case actionTypes.FIND_PROJECT_VOLUNTEERS_COMPLETED:
            return action.projectVolunteers;

        case actionTypes.CLEAR_PROJECT_VOLUNTEERS_SEARCH:
            return initialState.projectVolunteers;

        default:
            return state;

    }
}

const pendingParticipations = (state = initialState.pendingParticipations, action) => {
    switch (action.type){
        case actionTypes.FIND_PENDING_PARTICIPATIONS_COMPLETED:
            return action.pendingParticipations;

        default:
            return state;
    }
}

const reducer = combineReducers({
    participationsSearch,
    projectVolunteers,
    pendingParticipations
});

export default reducer;