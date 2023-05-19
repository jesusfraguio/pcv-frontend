const getModuleState = state => state?.participations;

export const getParticipationSearch = state =>
    getModuleState(state)?.participationsSearch;

export const getProjectVolunteers = state =>
    getModuleState(state)?.projectVolunteers;