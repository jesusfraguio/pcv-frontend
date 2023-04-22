import * as actionTypes from './actionTypes';
import backend from '../../backend';

const entityListCompleted = entities => ({
    type: actionTypes.ENTITY_LIST_COMPLETED,
    entities
});

export const createRepresentative = (user, onSuccess, onErrors) => dispatch =>
    backend.adminService.registerRepresentative(user,
        msg => {
            //dispatch(createRepresentativeCompleted(msg));
            onSuccess(msg);
        },
        onErrors
);

export const createEntity = (formData, onSuccess, onErrors) => dispatch =>
    backend.adminService.createEntity(formData,
        msg => {
            //dispatch(createRepresentativeCompleted(msg));
            onSuccess(msg);
        },
        onErrors
    );

export const seeEntitiesList = criteria => dispatch =>
    backend.adminService.seeEntitiesList(criteria,
        entities => {
            dispatch(entityListCompleted(entities));
        }
    );