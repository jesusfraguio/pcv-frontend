import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import * as actions from "../actions";
import * as selectors from "../selectors";
import {Pager} from "../../common";
import MyProjectVolunteers from "./MyProjectVolunteers";
import {useEffect, useState} from "react";
import * as participationAction from "../actions";
import Select from "react-select";

const MyParticipationsResult = () => {

    const dispatch = useDispatch();
    const intl = useIntl();
    const { projectId, name } = useParams();

    const [sortValue,setSortValue] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedYear,setSelectedYear] = useState('');
    const projectVolunteers = useSelector(selectors.getProjectVolunteers);

    const yearList = [];
    for (let i = new Date().getFullYear(); i >= 2022; i--) {
        yearList.push({ value: i.toString(), label: i.toString() });
    }

    useEffect(() => {
        if(!sortValue) {
            dispatch(participationAction.findProjectVolunteers({
                projectId: projectId,
                name: name,
                page: 0,
                size: 10
            }));
        }
        else {
            setSelectedYear(null);
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

    useEffect(() => {
        if(selectedYear){
            const volunteerIdsArray = projectVolunteers.result.items.map(item => item.volunteerId);
            dispatch(actions.findTotalHours(projectId,selectedYear.value,volunteerIdsArray));
        }
        else{
            dispatch(actions.removeAllYearHours);
        }
    }, [selectedYear]);

    if (!projectVolunteers || !projectVolunteers.result) {
        return null;
    }

    return (
        <div id='find-participation-result-wrapper'>
            <div>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <h2 style={{ marginBottom: '40px' }}>
                            {intl.formatMessage({ id: 'project.project.myParticipantsOf' })}
                            <Link to={`/projects/${projectId}`} className="name-link">
                                {name}
                            </Link>
                        </h2>
                    </div>
                    <div className="col-md-6">
                        <div style={{ width: '300px'}}>
                            <Select
                                options={yearList}
                                value={selectedYear}
                                onChange={setSelectedYear}
                                isSearchable={true}
                                isMulti={false}
                                isClearable={true}
                                placeholder={intl.formatMessage({ id: 'project.global.allYears' })}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <MyProjectVolunteers participations={projectVolunteers.result.items} orderBy={sortValue} setOrderBy={setSortValue}
            orderType={sortOrder} setOrderType={setSortOrder} projectId = {projectId} projectName={name} selectedYear = {selectedYear}/>
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