import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import * as actions from "../actions";
import * as selectors from "../selectors";
import {Pager} from "../../common";
import MyProjectVolunteers from "./MyProjectVolunteers";
import {useEffect, useState} from "react";
import * as participationAction from "../actions";

const MyParticipationsResult = () => {

    const dispatch = useDispatch();
    const intl = useIntl();
    const { projectId, name } = useParams();

    const [sortValue,setSortValue] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const projectVolunteers = useSelector(selectors.getProjectVolunteers);

    useEffect(() => {
        if(!sortValue) {
            dispatch(participationAction.findProjectVolunteers({
                projectId: projectId,
                name: name,
                page: 0,
                size: 10
            }));
        }
        else{
            dispatch(participationAction.findProjectVolunteers({
                projectId: projectId,
                name: name,
                page: 0,
                size: 10,
                sortValue: sortValue,
                sortOrder: sortOrder
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortValue,sortOrder]);

    if (!projectVolunteers || !projectVolunteers.result) {
        return null;
    }

    return (
        <div id='find-participation-result-wrapper'>
            <h2 style={{ marginBottom: '40px' }}>
                {intl.formatMessage({ id: 'project.project.myParticipantsOf' })}
                <Link to={`/projects/${projectId}`} className="name-link">
                    {name}
                </Link>
            </h2>
            <MyProjectVolunteers participations={projectVolunteers.result.items} orderBy={sortValue} setOrderBy={setSortValue}
            orderType={sortOrder} setOrderType={setSortOrder} projectId = {projectId} projectName={name}/>
            <Pager
                back={{
                    enabled: projectVolunteers.criteria.page >= 1,
                    onClick: () => dispatch(actions.previousFindMyParticipationsResultPage(projectVolunteers.criteria))}}
                next={{
                    enabled: projectVolunteers.result.existMoreItems,
                    onClick: () => dispatch(actions.nextFindMyParticipationsResultPage(projectVolunteers.criteria))}}/>
        </div>
    );

}

export default MyParticipationsResult;