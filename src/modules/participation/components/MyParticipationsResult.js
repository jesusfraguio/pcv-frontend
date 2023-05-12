import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import MyParticipations from "./MyParticipations";
import * as actions from "../actions";
import * as selectors from "../selectors";
import {Pager} from "../../common";
import {useEffect} from "react";

const MyParticipationsResult = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

    useEffect(() => {

        dispatch(actions.findMyParticipations({
            page: 0,
            size: 10
        }));

    }, []);

    const participationSearch = useSelector(selectors.getParticipationSearch);

    if (!participationSearch) {
        return null;
    }

    if (participationSearch.result.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='participation.participations.noParticipationsFound'/>
            </div>
        );
    }

    return (
        <div id='find-participation-result-wrapper'>
            <MyParticipations myParticipations={participationSearch.result.items} />
            <Pager
                back={{
                    enabled: participationSearch.criteria.page >= 1,
                    onClick: () => dispatch(actions.previousFindMyParticipationsResultPage(participationSearch.criteria))}}
                next={{
                    enabled: participationSearch.result.existMoreItems,
                    onClick: () => dispatch(actions.nextFindMyParticipationsResultPage(participationSearch.criteria))}}/>
        </div>
    );

}

export default MyParticipationsResult;