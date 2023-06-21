const getModuleState = state => state?.rep;

export const getVolunteerSearch = state =>
    getModuleState(state)?.volunteerSearch;