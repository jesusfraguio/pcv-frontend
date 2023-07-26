import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage, useIntl} from "react-intl";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as selectors from "../../project/selectors";
import * as actions from "../../project/actions";
import * as adminActions from "../actions";
import Select from "react-select";
import {Button} from "react-bootstrap";
import {Errors, Success} from "../../common";

const UpdateProjectOds = () => {

    const dispatch = useDispatch();
    const intl = useIntl();
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const [createdOk, setSuccess] = useState(null);
    const odsList = useSelector(selectors.getOds);
    const [selectedOds, setSelectedOds] = useState([]);
    const [selectEmptyError, setSelectEmptyError] = useState(false);

    const setCurrentOds = (projectData) => {
        setProjectData(projectData);
        setSelectedOds(optionsOds?.filter(ods => projectData.ods.includes(ods.value)));
    }
    const optionsOds = odsList?.map(a => ({
        value: a.id,
        label: a.name
    }));

    useEffect(() => {
        dispatch(actions.findProjectDetails(projectId, project => setCurrentOds(project)));
    },[odsList]);
    
    const handleUpdateProjectOds = () => {
        const listOfLongs = selectedOds.map((ee) => ee.value);
        dispatch(adminActions.updateProjectOds(projectId,listOfLongs, ok => ok ? setSuccess(true) : setBackendErrors({globalError: intl.formatMessage({id:"project.global.errors"})}), errors => setBackendErrors(errors)));
    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            { createdOk &&
                <Success onClose={() => setSuccess(false)} message={intl.formatMessage({id:"project.global.message.ok"})} />}
            <div className="form-group row mb-2">
                <label htmlFor="ods" className="col-md-3 col-form-label">
                    <FormattedMessage id="project.global.fields.ods"/>
                </label>
                <div className="col-md-4">
                    <Select
                        options={optionsOds}
                        value={selectedOds}
                        onChange={setSelectedOds}
                        isSearchable={true}
                        isMulti={true}
                        isClearable={true}
                        isInvalid={setSelectEmptyError}
                        required
                    />
                    {selectEmptyError && (
                        <div className="invalid-feedback">
                            <FormattedMessage id='project.global.validator.required'/>
                        </div>
                    )}
                </div>
            </div>
            <Button variant="secondary" className="buttonSecondary mx-2 btn-lg" onClick={() => handleUpdateProjectOds()}>
                {intl.formatMessage({id: "project.project.toggleOds.title"})}
            </Button>
        </div>
    );
}

export default UpdateProjectOds;