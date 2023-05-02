import {FormattedMessage} from 'react-intl';
import SeeProjectsFilters from "../../project/components/SeeProjectsFilters";

const Home = () => (
    <div className="text-center">
        <FormattedMessage id="project.app.Home.welcome"/>
        <SeeProjectsFilters/>
    </div>
);

export default Home;
