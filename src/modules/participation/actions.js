import backend from "../../backend";
import * as actionTypes from './actionTypes';

export const uploadMySignedCert = (formData, onSuccess, onErrors) =>
    backend.projectService.uploadMySignedCert(formData,
        msg => {
            onSuccess(msg);
        },
        onErrors
    );

export const uploadMyVolunteerSignedCert = (formData, onSuccess, onErrors) =>
    backend.projectService.uploadMyVolunteerSignedCert(formData,
        msg => {
            onSuccess(msg);
        },
        onErrors
    );
export const downloadEntityCert = (id) =>
    backend.projectService.getEntityCert(id, (file, fileName) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.download = fileName;
        downloadLink.click();
    });


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

export const updateProjectVolunteers = (id, status) => ({
    type: actionTypes.UPDATE_PROJECT_VOLUNTEERS,
    payload: { id, status }
});

export const updateMyParticipationStatus = (id, status) => ({
    type: actionTypes.UPDATE_MY_PARTICIPATION_STATUS,
    payload: {id, status }
})

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
    backend.representativeService.updateParticipationStatus(id,newStatus, onSuccess, onErrors);
}

export const removeParticipation = (id) => ({
    type: actionTypes.REMOVE_PARTICIPATION,
    id: id
});