import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import admin from '../modules/admin';
import projects from "../modules/project";
import participations from "../modules/participation"

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    entities: admin.reducer,
    projects: projects.reducer,
    participations: participations.reducer
});

export default rootReducer;
