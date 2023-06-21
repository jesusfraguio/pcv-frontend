import {config, appFetch} from './appFetch';

export const createProject = (project, onSuccess, onErrors) => {
    appFetch('/projects/createProject',config('POST',project),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}


export const findMyProjectVolunteers = ({projectId, page, size, sortValue, sortOrder},
                                     onSuccess) => {
    let path = `/participation/getAllProjectParticipations/`;
    path += projectId;
    path +=`?page=${page}`;
    path += size ? `&size=${size}` : "";
    path += sortValue ? `&sortValue=${sortValue}` : "";
    path += sortOrder ? `&sortOrder=${sortOrder}` : "";
    appFetch(path, config('GET'), onSuccess);
}

export const findAllPendingParticipations = ({page, size}, onSuccess) => {
    let path = `/participation/getAllPendingParticipations`;
    path +=`?page=${page}`;
    path += size ? `&size=${size}` : "";
    appFetch(path, config('GET'), onSuccess);
}

export const updateParticipationStatus = (id, newStatus, onSuccess, onErrors) => {
    let path = `/participation/`;
    path += id;
    appFetch(path,config('PATCH', newStatus), onSuccess, onErrors);
}

export const createVolunteer = (formData, onSuccess, onErrors) => {
    appFetch('/users/createVolunteer',config('POST',formData),
        msg => {
            onSuccess(msg)
        },
        onErrors);
}

export const findVolunteers = ({sortValue, sortOrder, page},
                               onSuccess) => {

    let path = `/users/representative/findMyVolunteers?page=${page}`;
    path += sortValue ? `&sortValue=${sortValue}` : "";
    path += sortOrder ? `&sortOrder=${sortOrder}` : "";

    appFetch(path, config('GET'), onSuccess);
}