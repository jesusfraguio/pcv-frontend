import {config, appFetch} from './appFetch';

export const createProject = (project, onSuccess, onErrors) => {
    appFetch('/projects/createProject',config('POST',project),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}


export const findMyProjectVolunteers = ({projectId, page, size},
                                     onSuccess) => {
    let path = `/participation/getAllProjectParticipations/`;
    path += projectId;
    path +=`?page=${page}`;
    path += size ? `&size=${size}` : "";
    appFetch(path, config('GET'), onSuccess);
}

export const findAllPendingParticipations = ({page, size}, onSuccess) => {
    let path = `/participation/getAllPendingParticipations`;
    path +=`?page=${page}`;
    path += size ? `&size=${size}` : "";
    appFetch(path, config('GET'), onSuccess);
}