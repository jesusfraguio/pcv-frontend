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
import {CreateRep, CreateEntity, UpdateProjectOds} from "../../admin";
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import project, {CreateProject, ProjectDetail, SeeProjectsFilters, SeeProjectsResult, UpdateProject} from "../../project";
import admin from "../../admin";
import CompletedProjectParticipation from "../../project/components/CompletedProjectParticipation";
import {MyParticipationsResult, MyProjectVolunteersResult, PendingParticipationsResult} from "../../participation";
import SeeMyEntityProjects from "../../project/components/SeeMyEntityProjects";
import UpdateDoc from "../../users/components/UpdateDoc";
import {CreateVolunteer, SeeVolunteers, SeeInvolvementHoursResult, UpdateMyEntity} from "../../rep";
import {EntityDetail} from "../../entity";

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const location = useLocation();
    const isAdmin = useSelector(users.selectors.isAdmin);
    const isRepresentative = useSelector(users.selectors.isRepresentative);
    //const isOnlyRepresentative = useSelector(users.selectors.isOnlyRepresentative);
    const dispatch = useDispatch();

    const getAppBodyClass = () => {
        return location.pathname === '/' ? 'app-body app-body--home' : 'app-body';
    };

    useEffect(() => {

        dispatch(project.actions.getOdsAndAreas());

    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);
    useEffect(() => {
      if(isAdmin || isRepresentative) {
          dispatch(admin.actions.getMyEntity());
      }

    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isAdmin, isRepresentative]);
    return (

       <div className={getAppBodyClass()}>
            <br/>
            <AppGlobalComponents/>
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
                {isAdmin && <Route path="/admin/update-project-ods/:projectId" element={<UpdateProjectOds/>}/>}
                {!loggedIn && <Route path="/users/login" element={<Login/>}/>}
                {!loggedIn && <Route path="/users/signup" element={<SignUp/>}/>}
                {isRepresentative && <Route path="/update-my-entity" element={<UpdateMyEntity/>}/> }
                {isRepresentative && <Route path="/projects/create-project" element={<CreateProject/>}/> }
                {isRepresentative && <Route path="/projects/update-project/:projectId" element={<UpdateProject/>}/> }
                {isRepresentative && <Route path="/projects-list" element={<SeeMyEntityProjects/>}/> }
                {isRepresentative && <Route path="/project/myVolunteers/:projectId/:name" element = {<MyProjectVolunteersResult/>}/> }
                {isRepresentative && <Route path="/update-participation-hours" element={<SeeInvolvementHoursResult/>}/> }
                <Route path="/project/find-projects-result" element={<SeeProjectsResult/>} />
                <Route path="/projects/:projectId" element={<ProjectDetail/>} />
                <Route path="/allProjects" element={<SeeProjectsFilters/>} />
                {loggedIn && <Route path="/projects/createMyParticipation-completed" element ={<CompletedProjectParticipation/>} />}
                {loggedIn && <Route path="/myProjects" element = {<MyParticipationsResult/>} /> }
                {isRepresentative && <Route path ="/users/:id" element={<SeeVolunteerSummaryProfile/>} /> }
                {isRepresentative && <Route path ="/pendingParticipations" element = {<PendingParticipationsResult/>} /> }
                {isRepresentative && <Route path ="/create-volunteer" element = {<CreateVolunteer/>} /> }
                {isRepresentative && <Route path ="/see-all-volunteers/:projectId/:name" element = {<SeeVolunteers/>} /> }
                <Route path="/entities/:entityId" element={<EntityDetail/>} />
            </Routes>
            </nav>
        </div>

    );

};

export default Body;
