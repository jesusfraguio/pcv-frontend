import backend from "../../backend";
import * as actionTypes from "./actionTypes";

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