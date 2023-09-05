import {config, appFetch, setServiceToken, getServiceToken, removeServiceToken, setReauthenticationCallback} from './appFetch';

export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) =>
    appFetch('/users/login', config('POST', {userName, password}),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        }, 
        onErrors);

export const tryLoginFromServiceToken = (onSuccess, reauthenticationCallback) => {

    const serviceToken = getServiceToken();

    if (!serviceToken) {
        onSuccess();
        return;
    }

    setReauthenticationCallback(reauthenticationCallback);

    appFetch('/users/loginFromServiceToken', config('POST'),
        authenticatedUser => onSuccess(authenticatedUser),
        () => removeServiceToken()
    );

}

export const sendRecoveryEmail = (email) => {
    appFetch('/users/recoveryEmail',config('POST', email));
}

export const signUp = (user, onSuccess, onErrors, reauthenticationCallback) => {

    appFetch('/users', config('POST', user),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        }, 
        onErrors);

}

export const logout = () => removeServiceToken();

export const updateProfile = (user, onSuccess, onErrors) =>
    appFetch(`/users/${user.id}`, config('PUT', user),
        onSuccess, onErrors);

export const updateMyDoc = (formData,id,onSuccess, onErrors) =>
    appFetch(`/users/${id}/volunteerDoc`,  config('POST', formData), onSuccess, onErrors);

export const changePassword = (id, oldPassword, newPassword, onSuccess,
    onErrors) =>
    appFetch(`/users/${id}/password`,
        config('POST', {oldPassword, newPassword}),
        onSuccess, onErrors);

export const createNewPassword = (newPassword, onSuccess, onErrors, reauthenticationCallback) =>
    appFetch('/users/newPasswordByTemporallyToken', config('POST', {newPassword}),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        },
        onErrors);

export const seeVolunteerSummaryProfile = (id, onSuccess, onErrors) =>
    appFetch(`/users/${id}`, config('GET'), onSuccess, onErrors);

export const seeVolunteerFullProfile = (id, onSuccess, onErrors) =>
    appFetch(`/users/${id}/volunteer`, config('GET'), onSuccess, onErrors);

export const updateMyVolunteer = (id, volunteerData, onSuccess, onErrors) =>
    appFetch(`/users/${id}/volunteer`, config('PUT', volunteerData), onSuccess, onErrors);
