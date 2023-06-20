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

}

const findVolunteersCompleted = volunteerSearch => ({
    type: actionTypes.FIND_VOLUNTEERS_COMPLETED,
    volunteerSearch
});

export const previousFindVolunteersResultPage = criteria =>
    findVolunteers({ ...criteria, page: criteria.page - 1 });

export const nextFindVolunteersResultPage = criteria =>
    findVolunteers({ ...criteria, page: criteria.page + 1 });