import backend from "../../backend";
import * as selectors from './selectors';
import * as actionTypes from './actionTypes';

const findAllCachedDataCompleted = cachedData => ({
    type: actionTypes.UPDATE_CACHED_DATA,
    cachedData
});

export const createProject = (project, onSuccess, onErrors) => dispatch =>
    backend.representativeService.createProject(project,
        msg => {
            onSuccess(msg);
        },
        onErrors
    );

export const getOdsAndAreas = () => (dispatch, getState) => {

    const cachedData = selectors.getAllCached(getState());
    if (!cachedData) {

        backend.projectService.findAllCachedData(
            cachedData => dispatch(findAllCachedDataCompleted(cachedData))
        );

    }

}