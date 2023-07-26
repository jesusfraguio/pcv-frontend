import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage, useIntl} from "react-intl";
import {useEffect, useState} from "react";
import * as actions from "../actions";
import * as selectors from "../selectors";
import UpdateInvolvementHours from "./UpdateInvolvementHours";
import Select from "react-select";
import moment from 'moment';
import {Errors} from "../../common";
import {Button} from "react-bootstrap";

const SeeInvolvementHoursResult = () => {

    const dispatch = useDispatch();
    const [startDate,setStartDate] = useState(moment().startOf('month').toDate());
    const participationHourSearch = useSelector(selectors.getParticipationHourSearch);
    const intl = useIntl();
    const [projectList, setProjectList] = useState([{value: '', label: 'Todos los proyectos'}]);
    const [selectedProject,setSelectedProject] = useState(null);
    const [backendErrors, setBackendErrors] = useState('');
    const defaultOption = {value: null, label: intl.formatMessage({id:"project.project.all"})};
    const [addParticipation, setAddParticipation] = useState(false);
    //const [success, setSuccess] = useState(false);

    //that number 518400000 are 6 days, this is to print all week registers in case it is in another month but in the same visual UI week.
    //example: day 31 is endDate and Monday, therefore 6 days until day 6(Sunday) would not be visible without this
    useEffect(() => {
        if(!selectedProject?.value) {
            dispatch(actions.findAllParticipationHourRegister({
                startDate: startDate.toISOString().split("T")[0],
                endDate: new Date(new Date(startDate.getFullYear(),startDate.getMonth()+1,0).getTime() + 518400000)
                    .toISOString().split("T")[0]
            }));
        }
        else{
            dispatch(actions.findAllParticipationHourRegister({
                projectId: selectedProject.value,
                startDate: startDate.toISOString().split("T")[0],
                endDate: new Date(new Date(startDate.getFullYear(),startDate.getMonth()+1,0).getTime() + 518400000)
                    .toISOString().split("T")[0]
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProject?.value, startDate]);

    useEffect(() => {
            actions.getAllMyProjectsName(data => setProjectList(data?.map(item => ({ value: item.id, label: item.name }))),
                errors => setBackendErrors(errors));
    }, []);

    const handleCloseAddModal = () => {
        setAddParticipation(false);
    };

    const handleAddParticipation = () => {
        setAddParticipation(true);
    };

    if (!participationHourSearch) {
        return null;
    }

    return (
        <div id='find-participation-result-wrapper'>
            <Errors errors={backendErrors} onClose={() => setBackendErrors('')} />
            <Button variant="primary" className="buttonSecondary btn btn-primary mb-2" onClick={handleAddParticipation}>
                {intl.formatMessage({id: 'project.global.buttons.addNewRegister'})}
            </Button>
            <div className="form-group row mb-2 align-content-center" style={{ position: 'relative', zIndex: 998 }}>
                <label htmlFor="project" className="col-md-3 col-form-label">
                    <FormattedMessage id="project.global.fields.project"/>
                </label>
                <Select
                    options={[defaultOption,...projectList]}
                    value={selectedProject}
                    onChange={setSelectedProject}
                    isSearchable={true}
                    isMulti={false}
                    isClearable={false}
                />
            </div>
            <UpdateInvolvementHours involvements={participationHourSearch} projectList={projectList} setStartDate={setStartDate}
                                    filterProject={selectedProject} addParticipation={addParticipation} handleCloseAddModal = {() => handleCloseAddModal()}/>
        </div>
    );

}

export default SeeInvolvementHoursResult;