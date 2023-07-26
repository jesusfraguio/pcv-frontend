import backend from "../../backend";
import * as actionTypes from "./actionTypes";
import * as adminTypes from "../admin/actionTypes";

const updateMyEntityStore = (myEntity) => ({
    type: adminTypes.UPDATE_MY_ENTITY,
    myEntity
});
export const updateMyEntity = (formData, entityId, onSuccess, onErrors) => dispatch =>
    backend.entityService.updateMyEntity(formData, entityId, myEntity => {
        dispatch(updateMyEntityStore(myEntity));
        onSuccess(myEntity);
        },
        onErrors
    );

export const createVolunteer = (formData, onSuccess, onErrors) =>
    backend.representativeService.createVolunteer(formData, onSuccess,
        onErrors
    );


export const findVolunteers = criteria => dispatch => {

    //dispatch(clearProjectSearch());
    backend.representativeService.findVolunteers(criteria,
        result => dispatch(findVolunteersCompleted({ criteria, result })));

};

export const getAllMyProjectsName = (onSuccess, onErrors) => {
    backend.representativeService.getAllMyProjects(onSuccess, onErrors);
};

export const getAllProjectParticipationName = (projectId, onSuccess, onErrors) => {
    backend.representativeService.getAllProjectParticipation(projectId,onSuccess,onErrors);
};

export const addNewParticipationHourRegister = (data, onSuccess, onErrors) => {
  backend.representativeService.createParticipationHourRegister(data, onSuccess, onErrors);
};

export const updateDeleteParticipationHour = (participationId) => ({
    type: actionTypes.DELETE_HOURS_PARTICIPATION,
    payload: participationId
})
export const deleteHourRegister = (id, onSuccess, onErrors) => {
    backend.representativeService.deleteParticipationHourRegister(id, onSuccess, onErrors);
};

export const updateParticipationHour = (participation) => ({
    type: actionTypes.UPDATE_HOURS_PARTICIPATION_SEARCH,
    payload: participation
});

const findParticipationHourCompleted = (participationHourSearch) => ({
    type: actionTypes.FIND_HOURS_PARTICIPATION_COMPLETED,
    participationHourSearch
});

export const findAllParticipationHourRegister = (data,onErrors) => dispatch => {
    backend.representativeService.getAllParticipationHourRegister(data,
            participation => dispatch(findParticipationHourCompleted(participation),onErrors));
}

export const addVolunteer = (participation, onSuccess, onErrors) =>
    backend.representativeService.createParticipationToVolunteer(participation,
        msg => {
            onSuccess(msg);
        },
        onErrors
    );

const findVolunteersCompleted = volunteerSearch => ({
    type: actionTypes.FIND_VOLUNTEERS_COMPLETED,
    volunteerSearch
});

export const previousFindVolunteersResultPage = criteria =>
    findVolunteers({ ...criteria, page: criteria.page - 1 });

export const nextFindVolunteersResultPage = criteria =>
    findVolunteers({ ...criteria, page: criteria.page + 1 });