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

        case actionTypes.UPDATE_MY_PARTICIPATION_STATUS:
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

        case actionTypes.FIND_YEAR_HOURS_COMPLETED:
            return {
                ...state,
                result: {
                    ...state.result,
                    items: state.result.items.map(item => {
                        const foundAction = action.totalHoursWrapper.find(actionItem => actionItem.volunteerId === item.volunteerId);
                        if (foundAction) {
                            return { ...item, yearHours: foundAction.totalHours};
                        } else {
                            return { ...item, yearHours: 0};
                        }
                    })
                }
            };

        case actionTypes.REMOVE_YEAR_HOURS:
            return {
                ...state,
                result: {
                    ...state.result,
                    items: state.result.items.map(item => {
                        return {... item, yearHours : null}
                    })
                }
            }

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