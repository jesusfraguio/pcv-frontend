import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    entities: null
};

const entities = (state = initialState.entities, action) => {

    switch (action.type) {

        case actionTypes.ENTITY_LIST_COMPLETED:
            return action.entities;

        default:
            return state;

    }

}

const reducer = combineReducers({
    entities
});

export default reducer;