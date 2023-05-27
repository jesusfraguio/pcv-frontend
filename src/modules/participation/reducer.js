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

        case actionTypes.UPDATE_PROJECT_VOLUNTEERS:
            return {
                ...state,
                result: {
                    ...state.result,
                    items: state.result.items.map(item => {
                        if (item.id === action.payload.id) {
                            return { ...item, status: action.payload.status };
                        }
                        return item;
                    })
                }
            };
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

        case actionTypes.REMOVE_PARTICIPATION:
            return {
                ...state,
                result: {
                    ...state.result,
                    items: state.result.items.filter(participation => participation.id !== action.id)
                }
            };

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