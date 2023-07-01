import {config, appFetch} from './appFetch';

export const createParticipationHourRegister = (data, onSuccess, onErrors) => {
    appFetch('/participation/createHourRegister',config('POST',data), onSuccess, onErrors);
}


export const createProject = (project, onSuccess, onErrors) => {
    appFetch('/projects/createProject',config('POST',project),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}

export const updateProject = (project, onSuccess, onErrors) => {
    appFetch('/projects/updateProject',config('POST',project),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}


export const findMyProjectVolunteers = ({projectId, page, size, sortValue, sortOrder},
                                     onSuccess) => {
    let path = `/participation/getAllProjectParticipations/`;
    path += projectId;
    path +=`?page=${page}`;
    path += size ? `&size=${size}` : "";
    path += sortValue ? `&sortValue=${sortValue}` : "";
    path += sortOrder ? `&sortOrder=${sortOrder}` : "";
    appFetch(path, config('GET'), onSuccess);
}

export const findAllPendingParticipations = ({page, size}, onSuccess) => {
    let path = `/participation/getAllPendingParticipations`;
    path +=`?page=${page}`;
    path += size ? `&size=${size}` : "";
    appFetch(path, config('GET'), onSuccess);
}

export const updateParticipationStatus = (id, newStatus, onSuccess, onErrors) => {
    let path = `/participation/`;
    path += id;
    appFetch(path,config('PATCH', newStatus), onSuccess, onErrors);
}

export const createVolunteer = (formData, onSuccess, onErrors) => {
    appFetch('/users/createVolunteer',config('POST',formData),
        msg => {
            onSuccess(msg)
        },
        onErrors);
};

export const createParticipationToVolunteer = (participation, onSuccess, onErrors) => {
    appFetch('/projects/representative/createParticipation',config('POST',participation),
        msg => {
            onSuccess(msg);
        },
        onErrors);
}

export const findVolunteers = ({sortValue, sortOrder, page},
                               onSuccess) => {

    let path = `/users/representative/findMyVolunteers?page=${page}`;
    path += sortValue ? `&sortValue=${sortValue}` : "";
    path += sortOrder ? `&sortOrder=${sortOrder}` : "";

    appFetch(path, config('GET'), onSuccess);
}

export const updateVolunteerDoc = (formData,id,onSuccess, onErrors) =>
    appFetch(`/users/representative/updateVolunteerDoc/${id}`,  config('POST', formData), onSuccess, onErrors);

export const downloadVolunteerFile = (volunteerId, fileType, onSuccess, onErrors) => {

    appFetch(`/users/representative/downloadVolunteerDoc/${volunteerId}?fileType=${fileType}`, config('GET'), onSuccess, onErrors);
}

export const getAllMyProjects = (onSuccess, onErrors) => {
    appFetch(`/participation/all-my-projects`, config('GET'), onSuccess, onErrors);
}
export const getAllProjectParticipation = (projectId, onSuccess, onErrors) => {
    appFetch(`/participation/project/${projectId}/participation`, config('GET'), onSuccess, onErrors);
}