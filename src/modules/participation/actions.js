import backend from "../../backend";
import * as actionTypes from './actionTypes';

const findMyParticipationsCompleted = participationsSearch => ({
    type: actionTypes.FIND_MYPARTICIPATIONS_COMPLETED,
    participationsSearch
});

export const findMyParticipations = criteria => dispatch => {
    backend.projectService.findMyParticipations(criteria,
        result => dispatch(findMyParticipationsCompleted({ criteria, result })));

}

export const previousFindMyParticipationsResultPage = criteria =>
    findMyParticipations({ ...criteria, page: criteria.page - 1 });

export const nextFindMyParticipationsResultPage = criteria =>
    findMyParticipations({ ...criteria, page: criteria.page + 1 });


// My project's volunteers (participations)
const findProjectVolunteersCompleted = projectVolunteers => ({
    type: actionTypes.FIND_PROJECT_VOLUNTEERS_COMPLETED,
    projectVolunteers
});

export const findProjectVolunteers = criteria => dispatch => {
    backend.representativeService.findMyProjectVolunteers(criteria,
        result => dispatch(findProjectVolunteersCompleted({ criteria, result })));

}

export const previousFindProjectVolunteersResultPage = criteria =>
    findProjectVolunteers({ ...criteria, page: criteria.page - 1 });

export const nextFindProjectVolunteersResultPage = criteria =>
    findProjectVolunteers({ ...criteria, page: criteria.page + 1 });


// My entity's pending participations
const findPendingParticipationsCompleted = pendingParticipations => ({
    type: actionTypes.FIND_PENDING_PARTICIPATIONS_COMPLETED,
    pendingParticipations
});

export const findAllPendingParticipations = criteria => dispatch => {
    backend.representativeService.findAllPendingParticipations(criteria,
        result => dispatch(findPendingParticipationsCompleted({ criteria, result })));
}

export const previousFindPendingParticipationsResultPage = criteria =>
    findAllPendingParticipations({ ...criteria, page: criteria.page - 1 });

export const nextFindPendingParticipationsResultPage = criteria =>
    findAllPendingParticipations({ ...criteria, page: criteria.page + 1 });

export const updateParticipation = (id, newStatus, onSuccess, onErrors) => {
    backend.representativeService.updateParticipationStatus(id,newStatus, onSuccess);
}

export const removeParticipation = (id) => ({
    type: actionTypes.REMOVE_PARTICIPATION,
    id: id
});