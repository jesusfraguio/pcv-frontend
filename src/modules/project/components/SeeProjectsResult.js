import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import {useEffect} from 'react';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {Pager} from "../../common";
import ProjectList from "./ProjectList";

const SeeProjectsResult = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

    const projectSearch = useSelector(selectors.getProjectSearch);

    if (!projectSearch) {
        return null;
    }

    if (projectSearch.result.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.projects.noProjectsFound'/>
            </div>
        );
    }

    return (
        <div id='find-project-result-wrapper'>
            <ProjectList projects={projectSearch.result.items} />
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