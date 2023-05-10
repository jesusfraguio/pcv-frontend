import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout, ValidateToken} from '../../users';
import users from '../../users';
import SideBar from "./SideBar";
import SideBarRepresentative from "./SideBarRepresentative";
import {CreateRep, CreateEntity} from "../../admin";
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import project, {CreateProject, ProjectDetail, SeeProjectsResult} from "../../project";
import admin from "../../admin";
import CompletedProjectParticipation from "../../project/components/CompletedProjectParticipation";

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const isAdmin = useSelector(users.selectors.isAdmin);
    const isRepresentative = useSelector(users.selectors.isRepresentative);
    const isOnlyRepresentative = useSelector(users.selectors.isOnlyRepresentative);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(project.actions.getOdsAndAreas());

    }, []);
    useEffect(() => {
      if(isAdmin || isRepresentative) {
          dispatch(admin.actions.getMyEntity());
      }

    }, [isAdmin, isRepresentative]);
    return (

       <div className="app-body">
            <br/>
            <AppGlobalComponents/>
            {isAdmin && <SideBar/>}
            {isOnlyRepresentative && <SideBarRepresentative/>}
            <nav className="nav__links">
            <Routes>
                <Route path="/*" element={<Home/>}/>
                <Route path="/users/validate/registerToken/:registerToken" element={<ValidateToken/>}/>
                {loggedIn && <Route path="/users/update-profile" element={<UpdateProfile/>}/>}
                {loggedIn && <Route path="/users/change-password" element={<ChangePassword/>}/>}
                {loggedIn && <Route path="/users/logout" element={<Logout/>}/>}
                {isAdmin && <Route path="/admin/create-representative" element={<CreateRep/>}/>}
                {isAdmin && <Route path="/admin/create-entity" element={<CreateEntity/>}/>}
                {!loggedIn && <Route path="/users/login" element={<Login/>}/>}
                {!loggedIn && <Route path="/users/signup" element={<SignUp/>}/>}
                {isRepresentative && <Route path="/projects/create-project" element={<CreateProject/>}/> }
                <Route path="/project/find-projects-result" element={<SeeProjectsResult/>} />
                <Route path="/projects/:projectId" element={<ProjectDetail/>} />
                <Route path="/projects/createMyParticipation-completed" element ={<CompletedProjectParticipation/>} />
            </Routes>
            </nav>
        </div>

    );

};

export default Body;
