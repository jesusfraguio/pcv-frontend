import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout, ValidateToken} from '../../users';
import users from '../../users';
import SideBar from "./SideBar";
import {CreateRep, CreateEntity} from "../../admin";

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const isAdmin = useSelector(users.selectors.isAdmin);
   return (

       <div className="app-body">
            <br/>
            <AppGlobalComponents/>
            {isAdmin && <SideBar/>}
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
            </Routes>
            </nav>
        </div>

    );

};

export default Body;
