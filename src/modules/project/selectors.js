const getModuleState = state => state?.projects;

export const getAllCached = state =>
    getModuleState(state)?.cachedData;

export const getCachedEntities = (state) =>
    getModuleState(state)?.entitiesLogos;

export const getProjectSearch = state =>
    getModuleState(state)?.projectSearch;

export const getOds = state =>
    getModuleState(state)?.cachedData?.odsSummary;

export const getAreas = state =>
    getModuleState(state)?.cachedData?.areaList;