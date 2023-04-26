import {config, appFetch} from './appFetch';

export const findAllCachedData = (onSuccess) =>
    appFetch('/projects/getSummaryOdsAndCollaborationArea', config('GET'), onSuccess);