import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    cachedData : null,
    projectSearch: null,
    entitiesLogos: {},
};

const cachedData = (state = initialState.cachedData, action) => {

    switch (action.type) {

        case actionTypes.UPDATE_CACHED_DATA:
            return action.cachedData;

        default:
            return state;

    }

}
const projectSearch = (state = initialState.projectSearch, action) => {

    switch (action.type) {

        case actionTypes.FIND_PROJECTS_COMPLETED:
            return action.projectSearch;

        case actionTypes.CLEAR_PROJECT_SEARCH:
            return initialState.projectSearch;

        default:
            return state;

    }
}

const entitiesLogos = (state = initialState.entitiesLogos, action) => {
    switch (action.type) {
        case actionTypes.GET_LOGO_SUCCESS:
            return {
                ...state,
                [action.entitiesLogos.entityId]: {
                    image: action.entitiesLogos.image
                }
            };

        default:
            return state;
    }
}

const reducer = combineReducers({
    cachedData,
    projectSearch,
    entitiesLogos
});

export default reducer;
