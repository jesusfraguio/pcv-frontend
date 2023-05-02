import {config, appFetch} from './appFetch';

export const findAllCachedData = (onSuccess) =>
    appFetch('/projects/getSummaryOdsAndCollaborationArea', config('GET'), onSuccess);


export const findProjectsBy = ({collaborationAreaId, locality, name, sortValue, sortOrder, page},
                           onSuccess) => {

    let path = `/projects/searchProjectsBy?page=${page}`;

    path += collaborationAreaId ? `&collaborationAreaId=${collaborationAreaId}` : "";
    path += locality ? `&locality=${locality}` : "";
    path += name.length > 0 ? `&name=${encodeURIComponent(name)}` : "";
    path += sortValue ? `&sortValue=${sortValue}` : "";
    path += sortOrder ? `&sortOrder=${sortOrder}` : "";

    appFetch(path, config('GET'), onSuccess);

}

export const getEntityLogo = (entityId, onSuccess) => {
    let path = `/projects/getLogo?entityId=${entityId}`;
    appFetch(path,config('GET'), image => onSuccess(image));
}