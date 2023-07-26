import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";

import * as actions from '../actions';
import * as selectors from '../selectors';
import {Pager} from "../../common";
import ProjectList from "./ProjectList";

const SeeProjectsResult = () => {

    const dispatch = useDispatch();

    const projectSearch = useSelector(selectors.getProjectSearch);

    if (!projectSearch) {
        return null;
    }

    if (projectSearch.result.items.length === 0) {
        return (
            <div>
                <div className="mb-4"/>
                <div className="alert alert-info" role="alert">
                    <FormattedMessage id='project.projects.noProjectsFound'/>
                </div>
            </div>

        );
    }

    return (
        <div id='find-project-result-wrapper' className="mt-4">
            <ProjectList projects={projectSearch.result.items} />
            <div className="mb-4"/>
            <Pager
                back={{
                    enabled: projectSearch.criteria.page >= 1,
                    onClick: () => dispatch(actions.previousFindProjectsResultPage(projectSearch.criteria))}}
                next={{
                    enabled: projectSearch.result.existMoreItems,
                    onClick: () => dispatch(actions.nextFindProjectsResultPage(projectSearch.criteria))}}/>
        </div>
    );

}

export default SeeProjectsResult;