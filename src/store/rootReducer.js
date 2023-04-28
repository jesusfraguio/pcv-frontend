import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import entities from '../modules/admin';
import projects from "../modules/project";

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    entities: entities.reducer,
    projects: projects.reducer,
});

export default rootReducer;
