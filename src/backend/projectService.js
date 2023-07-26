import {config, appFetch} from './appFetch';

export const uploadMySignedCert = (formData, onSuccess, onErrors) => {
    appFetch('/participation/addCertFile',config('POST',formData),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}

export const uploadMyVolunteerSignedCert = (formData, onSuccess, onErrors) => {
    appFetch('/participation/representative/addCertFile',config('POST',formData),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}


export const findAllCachedData = (onSuccess) =>
    appFetch('/projects/getSummaryOdsAndCollaborationArea', config('GET'), onSuccess);


export const findProjectsBy = ({collaborationAreaId, locality, name, sortValue, sortOrder, page, size},
                           onSuccess) => {

    let path = `/projects/searchProjectsBy?page=${page}`;

    path += size ? `&size=${size}` : "";
    path += collaborationAreaId ? `&collaborationAreaId=${collaborationAreaId}` : "";
    path += locality ? `&locality=${locality}` : "";
    path += name.length > 0 ? `&name=${encodeURIComponent(name)}` : "";
    path += sortValue ? `&sortValue=${sortValue}` : "";
    path += sortOrder ? `&sortOrder=${sortOrder}` : "";

    appFetch(path, config('GET'), onSuccess);

}

export const getEntityLogo = (entityId, onSuccess, onErrors) => {
    let path = `/entity/getLogo?entityId=${entityId}`;
    appFetch(path,config('GET'), image => onSuccess(image), onErrors);
}

export const getEntityCert = (entityId, onSuccess) => {
    let path = `/entity/getAgreementFile/${entityId}`;
    appFetch(path,config('GET'), onSuccess);
}

export const getProjectDetails = (projectId, onSuccess) => {
    let path = `/projects/project/${projectId}`;
    appFetch(path,config('GET'), onSuccess)
}

export const createParticipationAsVolunteer = (participation, onSuccess, onErrors) => {
    appFetch('/projects/createMyParticipation',config('POST',participation),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}

export const findMyParticipations = ({page, size},
                               onSuccess) => {

    let path = `/participation/my?page=${page}`;

    path += size ? `&size=${size}` : "";

    appFetch(path, config('GET'), onSuccess);

}

export const findMyEntityProjects = ({page, size, entityId},
                                     onSuccess) => {
    let path = `/projects/myEntityProjects?page=${page}`;
    path += size ? `&size=${size}` : "";
    path += entityId ? `&entityId=${entityId}` : "";
    appFetch(path, config('GET'), onSuccess);
}