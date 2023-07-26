import {config, appFetch} from './appFetch';

export const getEntityDetails = (entityId, onSuccess) => {
    let path = `/entity/entity/${entityId}`;
    appFetch(path,config('GET'), onSuccess);
}

export const updateMyEntity = (formData, entityId, onSuccess, onErrors) => {
    appFetch(`/entity/updateEntity/${entityId}`,config('POST',formData),
        onSuccess,
        onErrors);
}

export const getAllEntities = (onSuccess) => {
    appFetch('/entity/getAllEntitiesSelector', config('GET'), onSuccess);
}