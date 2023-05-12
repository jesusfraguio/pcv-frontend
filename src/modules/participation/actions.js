import backend from "../../backend";
import * as selectors from './selectors';
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