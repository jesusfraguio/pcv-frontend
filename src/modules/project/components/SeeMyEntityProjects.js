import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import {useEffect} from 'react';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {Pager} from "../../common";
import EntityProjects from "./EntityProjects";

const SeeMyEntityProjects = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

    useEffect(() => {

        dispatch(actions.findEntityProjects({
            page: 0,
            size: 10
        }));

    }, []);

    const entityProjects = useSelector(selectors.getEntityProjects);

    if (!entityProjects) {
        return null;
    }

    if (entityProjects.result.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.projects.noProjectsFound'/>
            </div>
        );
    }

    return (
        <div id='find-project-result-wrapper'>
            <EntityProjects entityProjects={entityProjects.result.items} />
            <Pager
                back={{
                    enabled: entityProjects.criteria.page >= 1,
                    onClick: () => dispatch(actions.previousFindEntityProjectsResultPage(entityProjects.criteria))}}
                next={{
                    enabled: entityProjects.result.existMoreItems,
                    onClick: () => dispatch(actions.nextFindEntityProjectsResultPage(entityProjects.criteria))}}/>
        </div>
    );

}

export default SeeMyEntityProjects;