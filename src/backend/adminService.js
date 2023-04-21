import {config, appFetch} from './appFetch';

export const registerRepresentative = (user, onSuccess, onErrors) => {

    appFetch('/admin/createRepresentative', config('POST', user),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}

export const createEntity = (formData, onSuccess, onErrors) => {
    appFetch('/admin/createEntity',config('POST',formData),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}


