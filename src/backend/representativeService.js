import {config, appFetch} from './appFetch';

export const createProject = (project, onSuccess, onErrors) => {
    appFetch('/projects/createProject',config('POST',project),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}