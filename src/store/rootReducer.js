import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import admin from '../modules/admin';
import projects from "../modules/project";
import participations from "../modules/participation";
import rep from "../modules/rep";

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    entities: admin.reducer,
    projects: projects.reducer,
    participations: participations.reducer,
    rep: rep.reducer
});

export default rootReducer;
