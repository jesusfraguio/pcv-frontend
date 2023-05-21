import {config, appFetch} from './appFetch';

export const registerRepresentative = (user, onSuccess, onErrors) => {

    appFetch('/admin/createRepresentative', config('POST', user),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}

export const createEntity = (formData, onErrors) => {
    appFetch('/admin/createEntity',config('POST',formData),
        msg => {
        },
        onErrors);
}

export const seeEntitiesList = ({page,size}, onSuccess) =>
    appFetch(`/admin/getEntities?page=${page}&size=${size}`, config('GET'), onSuccess);

export const seeMyEntity = (onSuccess) =>
    appFetch(`/admin/getMyEntity`, config('GET'), onSuccess);


