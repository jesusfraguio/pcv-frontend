import backend from "../../backend";

export const createVolunteer = (formData, onSuccess, onErrors) =>
    backend.representativeService.createVolunteer(formData, onSuccess,
        onErrors
    );