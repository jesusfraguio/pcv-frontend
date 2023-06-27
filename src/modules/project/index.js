import * as actions from './actions';
import * as actionTypes from './actionTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as CreateProject} from './components/CreateProject';
export {default as UpdateProject} from './components/UpdateProject';
export {default as SeeProjectsFilters} from './components/SeeProjectsFilters';
export {default as SeeProjectsResult} from './components/SeeProjectsResult';
export {default as ProjectDetail} from './components/ProjectDetail'
// eslint-disable-next-line
export default {actions, actionTypes, reducer, selectors};