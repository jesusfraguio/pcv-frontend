import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import * as actions from "../actions";
import * as selectors from "../selectors";
import {Pager} from "../../common";
import PendingParticipations from "./PendingParticipations";

const PendingParticipationsResult = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

    const projectVolunteers = useSelector(selectors.getPendingParticipations);

    if (!projectVolunteers) {
        return null;
    }

    if (projectVolunteers.result.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.participations.noParticipationsFound'/>
            </div>
        );
    }

    return (
        <div id='find-participation-result-wrapper'>
            <h2 style={{ marginBottom: '40px' }}>
                {intl.formatMessage({ id: 'project.project.myPendingParticipants' })}
            </h2>
            <PendingParticipations participations={projectVolunteers.result.items}/>
            <Pager
                back={{
                    enabled: projectVolunteers.criteria.page >= 1,
                    onClick: () => dispatch(actions.previousFindPendingParticipationsResultPage(projectVolunteers.criteria))}}
                next={{
                    enabled: projectVolunteers.result.existMoreItems,
                    onClick: () => dispatch(actions.nextFindPendingParticipationsResultPage(projectVolunteers.criteria))}}/>
        </div>
    );

}

export default PendingParticipationsResult;