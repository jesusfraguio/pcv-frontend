import backend from '../../backend';


export const findEntityDetails = (entityId, onSuccess) =>
    backend.entityService.getEntityDetails(entityId, entity => {onSuccess(entity); })

export const findAllEntity = (onSuccess) =>
    backend.entityService.getAllEntities(onSuccess);