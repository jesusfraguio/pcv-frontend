import * as actionTypes from './actionTypes';
import backend from '../../backend';

const signUpCompleted = authenticatedUser => ({
    type: actionTypes.SIGN_UP_COMPLETED,
    authenticatedUser
});

export const signUp = (user, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.userService.signUp(user,
        authenticatedUser => {
            dispatch(signUpCompleted(authenticatedUser));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback);

export const createPassword = (newPassword, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.userService.createNewPassword(newPassword,
        authenticatedUser => {
            dispatch(loginCompleted(authenticatedUser));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback);

const loginCompleted = authenticatedUser => ({
    type: actionTypes.LOGIN_COMPLETED,
    authenticatedUser
});

export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.userService.login(userName, password,
        authenticatedUser => {
            dispatch(loginCompleted(authenticatedUser));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback
    );

export const tryLoginFromServiceToken = reauthenticationCallback => dispatch =>
    backend.userService.tryLoginFromServiceToken(
        authenticatedUser => {
            if (authenticatedUser) {
                dispatch(loginCompleted(authenticatedUser));
            }
        },
        reauthenticationCallback
    );
    

export const logout = () => {

    backend.userService.logout();

    return {type: actionTypes.LOGOUT};

};

export const updateProfileCompleted = user => ({
    type: actionTypes.UPDATE_PROFILE_COMPLETED,
    user
})

export const updateProfile = (user, onSuccess, onErrors) => dispatch =>
    backend.userService.updateProfile(user, 
        user => {
            dispatch(updateProfileCompleted(user));
            onSuccess();
        },
        onErrors);

export const updateMyDoc = (formData, id, onSuccess, onErrors) =>
    backend.userService.updateMyDoc(formData,id,onSuccess,onErrors);

export const updateVolunteerDocs = (formData, id, onSuccess, onErrors) =>
    backend.representativeService.updateVolunteerDoc(formData,id,onSuccess,onErrors);

export const downloadFile = (volunteerId, fileType, onSuccess, onErrors) =>
    backend.representativeService.downloadVolunteerFile(volunteerId, fileType, (file, fileName) => {
        /*
        const blob = new Blob([file.data], {
            type: file.headers['content-type'],
        });
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = "descstga"
        downloadLink.click();*/

        const downloadLink = document.createElement('a');
        const fileUrl = URL.createObjectURL(file);
        downloadLink.href = fileUrl;
        //downloadLink.setAttribute('download', fileName);
        downloadLink.download = fileName;

        downloadLink.click();

    }, onErrors);

export const getVolunteerEmbedFile = (volunteerId, fileType, onSuccess, onErrors) =>
    backend.representativeService.downloadVolunteerFile(volunteerId, fileType, (file, fileName) => {
        onSuccess(URL.createObjectURL(file));
    }, onErrors);

export const changePassword = (id, oldPassword, newPassword, onSuccess, onErrors) => dispatch =>
    backend.userService.changePassword(id, oldPassword, newPassword, onSuccess, onErrors);

export const recoverPassword = (email) => dispatch =>
    backend.userService.sendRecoveryEmail(email);

export const seeVolunteerSummary = (id, onSuccess, onErrors) => dispatch =>
    backend.userService.seeVolunteerSummaryProfile(id,onSuccess,onErrors);

export const seeVolunteerFullProfile = (id, onSuccess, onErrors) => dispatch =>
    backend.userService.seeVolunteerFullProfile(id,onSuccess,onErrors);

export const updateMyVolunteer = (id,volunteerData, onSuccess, onErrors) => dispatch =>
    backend.userService.updateMyVolunteer(id,volunteerData,onSuccess,onErrors);