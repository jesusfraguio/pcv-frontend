import NetworkError from './NetworkError';

const SERVICE_TOKEN_NAME = 'serviceToken';

let networkErrorCallback;
let reauthenticationCallback;

const isJson = response => {

    const contentType = response.headers.get("content-type");

    return contentType && contentType.indexOf("application/json") !== -1;

}

const handleOkResponse = (response, onSuccess) => {

    if (!response.ok) {
        return false;
    }

    if (!onSuccess) {
        return true;
    }

    if (response.status === 204) {
        onSuccess();
        return true;
    }

    if(response.status === 200 && (response.headers.get("content-type").includes("image") || response.headers.get("content-type").includes("pdf"))){
        const fileName = response.headers.get("Content-Disposition");
        const name = extractFileName(fileName);
        response.blob().then(payload => onSuccess(payload, name));
    }

    if (isJson(response)) {
        response.json().then(payload => onSuccess(payload));
    }

    return true;

}

function extractFileName(header) {
    const fileNameStartIndex = header.indexOf("filename=");
    if (fileNameStartIndex !== -1) {
        const startIndex = fileNameStartIndex + 10; // Add 10 to skip "filename="
        const endIndex = header.indexOf('"', startIndex); // Find the next occurrence of a double quote (")
        if (endIndex !== -1) {
            return header.substring(startIndex, endIndex);
        }
    }
    return null;
}

const handle4xxResponse = (response, onErrors) => {

    if (response.status < 400 || response.status >= 500) {
        return false;
    }

    if (response.status === 401 && reauthenticationCallback){
        reauthenticationCallback();
        return true;
    }

    if (!isJson(response)) {
        throw new NetworkError();
    }

    if (onErrors) {

        response.json().then(payload => {
            if (payload.globalError || payload.fieldErrors) {
                onErrors(payload);
            }
        });

    }

    return true;

}

const handleResponse = (response, onSuccess, onErrors) => {

    if (handleOkResponse(response, onSuccess)) {
        return;
    }

    if (handle4xxResponse(response, onErrors)) {
        return;
    }

    throw new NetworkError();
    
}

export const init = callback => networkErrorCallback = callback;

export const setReauthenticationCallback = callback => reauthenticationCallback = callback;

export const setServiceToken = (serviceToken) => {
    const rememberedValue = localStorage.getItem('REMEMBERED');

    if (!rememberedValue || rememberedValue === 'false') {
        sessionStorage.setItem(SERVICE_TOKEN_NAME, serviceToken);
    } else {
        localStorage.setItem(SERVICE_TOKEN_NAME, serviceToken);
    }
};

export const getServiceToken = () => {
    const rememberedValue = localStorage.getItem('REMEMBERED');

    if (!rememberedValue || rememberedValue === 'false') {
        return sessionStorage.getItem(SERVICE_TOKEN_NAME);
    } else {
        return localStorage.getItem(SERVICE_TOKEN_NAME);
    }
};

export const removeServiceToken = () => {
    localStorage.removeItem(SERVICE_TOKEN_NAME);
    sessionStorage.removeItem(SERVICE_TOKEN_NAME);
    localStorage.removeItem('REMEMBERED');
};

export const setRemembered = boolValue =>
    localStorage.setItem('REMEMBERED',boolValue);

export const getRemembered = () => localStorage.getItem('REMEMBERED');

export const config = (method, body) => {

    const fConfig = {
        method: method,
    };

    if (body) {
        if (body instanceof FormData) {
            fConfig.headers = { 'enctype': 'multipart/form-data'};
            fConfig.body = body;
        } else  {
            fConfig.headers = {'Content-Type': 'application/json'};
            fConfig.body = JSON.stringify(body);
        }
    }

    let serviceToken = getServiceToken();

    if (serviceToken) {

        if (fConfig.headers) {
            fConfig.headers['Authorization'] = `Bearer ${serviceToken}`;
        } else {
            fConfig.headers = {'Authorization': `Bearer ${serviceToken}`};
        }

    }

    return fConfig;

}

export const appFetch = (path, options, onSuccess, onErrors) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, options)
        .then(response => handleResponse(response, onSuccess, onErrors))
        .catch(networkErrorCallback);
