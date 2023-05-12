const getModuleState = state => state?.participations;

export const getParticipationSearch = state =>
    getModuleState(state)?.participationsSearch;