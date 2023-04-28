const getModuleState = state => state.projects;

export const getAllCached = state =>
    getModuleState(state)?.cachedData;

export const getOds = state =>
    getModuleState(state)?.cachedData?.odsSummary;

export const getAreas = state =>
    getModuleState(state)?.cachedData?.areaList;