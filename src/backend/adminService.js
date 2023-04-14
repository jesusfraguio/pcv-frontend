import {config, appFetch} from './appFetch';

export const registerRepresentative = (user, onSuccess, onErrors) => {

    appFetch('/admin/createRepresentative', config('POST', user),
        msg => {
            onSuccess(msg);
        },
        onErrors);

}