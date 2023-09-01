import * as actionTypes from './actionTypes';
import backend from '../../backend';
import * as selectors from "./selectors";

const entityListCompleted = entities => ({
    type: actionTypes.ENTITY_LIST_COMPLETED,
    entities
});

const myEntityCompleted = myEntity => ({
    type: actionTypes.MY_ENTITY_COMPLETED,
    myEntity
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
    backend.adminService.createEntity(formData, onSuccess,
        onErrors
    );

export const seeEntitiesList = criteria => dispatch =>
    backend.adminService.seeEntitiesList(criteria,
        entities => {
            dispatch(entityListCompleted(entities));
        }
    );
export const getMyEntity = () => (dispatch, getState) => {

    const myEntity = selectors.getMyEntity(getState());
    if (!myEntity) {

        backend.adminService.seeMyEntity(
            myEntity => dispatch(myEntityCompleted(myEntity))
        );

    }

}

export const updateProjectOds = (projectId, odsList, onSuccess, onErrors)  => dispatch => {
    backend.adminService.updateProjectOds(projectId,odsList,onSuccess,onErrors);
}

export const deleteVolunteer = (dni, onSuccess, onErrors) => dispatch => {
    backend.adminService.deleteVolunteer(dni,onSuccess,onErrors);
}