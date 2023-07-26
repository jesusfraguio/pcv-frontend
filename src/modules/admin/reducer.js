import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    entities: null,
    myEntity: null
};

const entities = (state = initialState.entities, action) => {

    switch (action.type) {

        case actionTypes.ENTITY_LIST_COMPLETED:
            return action.entities;

        default:
            return state;

    }

}

const myEntity = (state = initialState.myEntity, action) => {

    switch (action.type) {

        case actionTypes.MY_ENTITY_COMPLETED:
            return action.myEntity;

        case actionTypes.UPDATE_MY_ENTITY:
            return action.myEntity;

        default:
            return state;

    }

}

const reducer = combineReducers({
    entities,
    myEntity
});

export default reducer;