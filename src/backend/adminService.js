import {config, appFetch} from './appFetch';

export const registerRepresentative = (user, onSuccess, onErrors) => {

    appFetch('/admin/representatives', config('POST', user),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}

export const createEntity = (formData, onSuccess, onErrors) => {
    appFetch('/admin/entities',config('POST',formData),
        msg => {
        onSuccess(msg)
        },
        onErrors);
}

export const seeEntitiesList = ({page,size}, onSuccess) =>
    appFetch(`/admin/entities?page=${page}&size=${size}`, config('GET'), onSuccess);

export const seeMyEntity = (onSuccess) =>
    appFetch(`/admin/entities/myEntity`, config('GET'), onSuccess);

export const updateProjectOds = (projectId, odsList, onSuccess, onErrors) =>
    appFetch(`/admin/projects/${projectId}/ods`,config('PATCH',odsList), onSuccess,
        onErrors);

export const deleteVolunteer = (dni, onSuccess, onErrors) => {
    let path = `/admin/users`;
    path +=`?dni=${dni}`;
    appFetch(path, config('DELETE'), onSuccess, onErrors);
}

