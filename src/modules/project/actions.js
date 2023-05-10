import backend from "../../backend";
import * as selectors from './selectors';
import * as actionTypes from './actionTypes';

const findAllCachedDataCompleted = cachedData => ({
    type: actionTypes.UPDATE_CACHED_DATA,
    cachedData
});

export const getLogoSuccess = (entityId, image) => ({
    type: actionTypes.GET_LOGO_SUCCESS,
    entitiesLogos: { entityId, image }
});

export const createProject = (project, onSuccess, onErrors) => dispatch =>
    backend.representativeService.createProject(project,
        msg => {
            onSuccess(msg);
        },
        onErrors
    );

export const getLogo = (entityId) => dispatch =>
    backend.projectService.getEntityLogo(entityId, image =>
        dispatch(getLogoSuccess(entityId,URL.createObjectURL(image))), errors => dispatch(getLogoSuccess(entityId,process.env.PUBLIC_URL + "/logo192.png")));


export const getOdsAndAreas = () => (dispatch, getState) => {

    const cachedData = selectors.getAllCached(getState());
    if (!cachedData) {

        backend.projectService.findAllCachedData(
            cachedData => dispatch(findAllCachedDataCompleted(cachedData))
        );

    }

}

export const findProjectDetails = (projectId, onSuccess) => dispatch =>
    backend.projectService.getProjectDetails(projectId, project => {onSuccess(project); })

export const findProjects = criteria => dispatch => {

    //dispatch(clearProjectSearch());
    backend.projectService.findProjectsBy(criteria,
        result => dispatch(findProjectsCompleted({ criteria, result })));

}

const findProjectsCompleted = projectSearch => ({
    type: actionTypes.FIND_PROJECTS_COMPLETED,
    projectSearch
});

const clearProjectSearch = () => ({
    type: actionTypes.CLEAR_PROJECT_SEARCH
});

export const previousFindProjectsResultPage = criteria =>
    findProjects({ ...criteria, page: criteria.page - 1 });

export const nextFindProjectsResultPage = criteria =>
    findProjects({ ...criteria, page: criteria.page + 1 });


export const createParticipationAsVolunteer = (participation, onSuccess, onErrors) => dispatch =>
    backend.projectService.createParticipationAsVolunteer(participation,
        msg => {
            onSuccess(msg);
        },
        onErrors
    );