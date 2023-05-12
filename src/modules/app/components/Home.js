import SeeProjectsFilters from "../../project/components/SeeProjectsFilters";
import NotLoggedUserShowLogin from "./NotLoggedUserShowLogin";
import {useSelector} from "react-redux";
import users from "../../users";

const Home = () => {
    const loggedIn = useSelector(users.selectors.isLoggedIn);
    return (
        <div className="text-center">
            {!loggedIn && <NotLoggedUserShowLogin/>}
            {loggedIn && <SeeProjectsFilters/>}
        </div>
    );
}

export default Home;
