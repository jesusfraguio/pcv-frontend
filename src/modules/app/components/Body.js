import {useSelector} from 'react-redux';
import {Route, Routes, useLocation} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {
    Login,
    SignUp,
    UpdateProfile,
    ChangePassword,
    Logout,
    ValidateToken,
    SeeVolunteerSummaryProfile
} from '../../users';
import users from '../../users';
import SideBar from "./SideBar";
import SideBarRepresentative from "./SideBarRepresentative";
import {CreateRep, CreateEntity} from "../../admin";
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import project, {CreateProject, ProjectDetail, SeeProjectsFilters, SeeProjectsResult} from "../../project";
import admin from "../../admin";
import CompletedProjectParticipation from "../../project/components/CompletedProjectParticipation";
import {MyParticipationsResult, MyProjectVolunteersResult, PendingParticipationsResult} from "../../participation";
import SeeMyEntityProjects from "../../project/components/SeeMyEntityProjects";
import UpdateDoc from "../../users/components/UpdateDoc";

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const location = useLocation();
    const isAdmin = useSelector(users.selectors.isAdmin);
    const isRepresentative = useSelector(users.selectors.isRepresentative);
    const isOnlyRepresentative = useSelector(users.selectors.isOnlyRepresentative);
    const dispatch = useDispatch();

    const getAppBodyClass = () => {
        return location.pathname === '/' ? 'app-body app-body--home' : 'app-body';
    };

    useEffect(() => {

        dispatch(project.actions.getOdsAndAreas());

    }, []);
    useEffect(() => {
      if(isAdmin || isRepresentative) {
          dispatch(admin.actions.getMyEntity());
      }

    }, [isAdmin, isRepresentative]);
    return (

       <div className={getAppBodyClass()}>
            <br/>
            <AppGlobalComponents/>
            {isAdmin && <SideBar/>}
            {isOnlyRepresentative && <SideBarRepresentative/>}
            <nav className="nav__links">
            <Routes>
                <Route path="/*" element={<Home/>}/>
                <Route path="/users/validate/registerToken/:registerToken" element={<ValidateToken/>}/>
                {loggedIn && <Route path="/users/update-profile" element={<UpdateProfile/>}/>}
                {loggedIn && <Route path ="/users/update-my-doc" element = {<UpdateDoc/>} /> }
                {loggedIn && <Route path="/users/change-password" element={<ChangePassword/>}/>}
                {loggedIn && <Route path="/users/logout" element={<Logout/>}/>}
                {isAdmin && <Route path="/admin/create-representative" element={<CreateRep/>}/>}
                {isAdmin && <Route path="/admin/create-entity" element={<CreateEntity/>}/>}
                {!loggedIn && <Route path="/users/login" element={<Login/>}/>}
                {!loggedIn && <Route path="/users/signup" element={<SignUp/>}/>}
                {isRepresentative && <Route path="/projects/create-project" element={<CreateProject/>}/> }
                {isRepresentative && <Route path="/projects-list" element={<SeeMyEntityProjects/>}/> }
                {isRepresentative && <Route path="/project/myVolunteers/:projectId/:name" element = {<MyProjectVolunteersResult/>}/> }
                <Route path="/project/find-projects-result" element={<SeeProjectsResult/>} />
                <Route path="/projects/:projectId" element={<ProjectDetail/>} />
                <Route path="/allProjects" element={<SeeProjectsFilters/>} />
                {loggedIn && <Route path="/projects/createMyParticipation-completed" element ={<CompletedProjectParticipation/>} />}
                {loggedIn && <Route path="/myProjects" element = {<MyParticipationsResult/>} /> }
                {isRepresentative && <Route path ="/users/:id" element={<SeeVolunteerSummaryProfile/>} /> }
                {isRepresentative && <Route path ="/pendingParticipations" element = {<PendingParticipationsResult/>} /> }
            </Routes>
            </nav>
        </div>

    );

};

export default Body;
