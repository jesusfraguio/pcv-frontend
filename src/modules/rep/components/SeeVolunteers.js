import {useEffect, useState} from "react";
import * as actions from "../actions";
import {Pager} from "../../common";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../selectors";
import {FormattedMessage, useIntl} from "react-intl";
import AvailableVolunteers from "./AvailableVolunteers";
import {Link, useParams} from "react-router-dom";

const SeeVolunteers = () => {

    const {projectId,name} = useParams();
    const dispatch = useDispatch();
    const [sortValue,setSortValue] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const intl = useIntl();

    useEffect(() => {
        if(!sortValue) {
            dispatch(actions.findVolunteers({
                page: 0,
                size: 10
            }));
        }
        else{
            dispatch(actions.findVolunteers({
                page: 0,
                size: 10,
                sortValue: sortValue,
                sortOrder: sortOrder
            }));
        }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [sortValue,sortOrder]);

    const volunteersResult = useSelector(selectors.getVolunteerSearch);

    if (!volunteersResult || !volunteersResult.result) {
        return null;
    }

    if (volunteersResult.result.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.participations.noParticipationsFound'/>
            </div>
        );
    }

    return (
        <div id='find-volunteers-result-wrapper'>
            <h2 style={{ marginBottom: '40px' }}>
                {intl.formatMessage({ id: 'project.project.availableVolunteers' })}
                <Link to={`/projects/${projectId}`} className="name-link">
                    {name}
                </Link>
            </h2>
            <AvailableVolunteers projectId={projectId} volunteers={volunteersResult.result.items}
                                     orderBy={sortValue} setOrderBy={setSortValue}
                                     orderType={sortOrder} setOrderType={setSortOrder}/>
            <Pager
                back={{
                    enabled: volunteersResult.criteria.page >= 1,
                    onClick: () => dispatch(actions.previousFindVolunteersResultPage(volunteersResult.criteria))}}
                next={{
                    enabled: volunteersResult.result.existMoreItems,
                    onClick: () => dispatch(actions.nextFindVolunteersResultPage(volunteersResult.criteria))}}/>
        </div>
    );
}

export default SeeVolunteers;
