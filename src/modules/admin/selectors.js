const getModuleState = state => state.entities;

export const getEntities = state => getModuleState(state).entities;

export const getMyEntity = state => getModuleState(state).myEntity;
