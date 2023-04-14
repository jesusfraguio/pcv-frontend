const getModuleState = state => state.users;

export const getUser = state => 
    getModuleState(state).user;

export const isLoggedIn = state =>
    getUser(state) !== null

export const getEmail = state =>
    isLoggedIn(state) ? getUser(state).email : null;

export const isUser = state =>
    isLoggedIn(state) ? getUser(state).role==="USER" : null;

export const isAdmin = state =>
    isLoggedIn(state) ? getUser(state).role==="ADMIN" : null;

export const isRepresentative = state =>
    isLoggedIn(state) ? getUser(state).role==="REPRESENTATIVE" : null;



