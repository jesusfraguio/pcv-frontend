import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import entities from '../modules/admin';
import projects from "../modules/project";
import participations from "../modules/participation"

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    entities: entities.reducer,
    projects: projects.reducer,
    participations: participations.reducer
});

export default rootReducer;
