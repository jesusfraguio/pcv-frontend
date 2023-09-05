import {config, appFetch} from './appFetch';

export const getEntityDetails = (entityId, onSuccess) => {
    let path = `/entities/${entityId}`;
    appFetch(path,config('GET'), onSuccess);
}

export const updateMyEntity = (formData, entityId, onSuccess, onErrors) => {
    appFetch(`/entities/${entityId}/update`,config('POST',formData),
        onSuccess,
        onErrors);
}

export const getAllEntities = (onSuccess) => {
    appFetch('/entities/entitiesSelector', config('GET'), onSuccess);
}