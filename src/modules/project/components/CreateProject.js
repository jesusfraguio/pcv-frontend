import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import {Errors, Success} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {Card, FormControl, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useIntl } from 'react-intl';
import './CreateProjectTask.css';
import Select from "react-select";
import admin from "../../admin";
const CreateProject = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [locality, setLocality] = useState('');
    const [schedule, setSchedule] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [preferableVolunteer, setPreferableVolunteer] = useState('');
    const [areChildren, setAreChildren] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [tasks, setTasks] = useState([]);
    const myEntity = useSelector(admin.selectors.getMyEntity);
    const [backendErrors, setBackendErrors] = useState(null);
    const [createdOk, setSuccess] = useState(null);
    const odsList = useSelector(selectors.getOds);
    const [selectedOds, setSelectedOds] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const areaList = useSelector(selectors.getAreas);
    const [selectEmptyError, setSelectEmptyError] = useState(false);
    const optionsOds = odsList?.map(a => ({
        value: a.id,
        label: a.name
    }));
    const optionsAreas = areaList?.map(a => ({
        value: a.id,
        label: a.name
    }));
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            if (!selectedOds || !selectedArea) {
                setSelectEmptyError(true);
                return;
            }
            dispatch(actions.createProject(
                {name: name.trim(),
                    shortDescription: shortDescription.trim(),
                    longDescription: longDescription.trim(),
                    locality: locality.trim(),
                    schedule: schedule.trim(),
                    capacity,
                    preferableVolunteer: preferableVolunteer.trim(),
                    areChildren,
                    visible: isVisible,
                    tasks: tasks.map((task) => task.trim()),
                    ods: selectedOds.map((ee) => ee.value),
                    entityId: myEntity.id,
                    areaId: selectedArea.value,
                },
                message => navigate("/projects/myProjects/"+message.id),
                errors => setBackendErrors(errors),
            ));

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleAddButtonClick = () => {
        if (inputValue !== '') {
            setTasks([...tasks, inputValue]);
            setInputValue('');
        }
    }

    const handleDeleteButtonClick = (index) => {
        const newList = [...tasks];
        newList.splice(index, 1);
        setTasks(newList);
    }
    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <Success message={createdOk}
                     onClose={() => setSuccess(null)}/>
            <Card className="card-main">
                <Card.Header className="bg-transparent border-0 text-center">
                    <h5>
                        <FormattedMessage id="project.admin.CreateProject.title"/>
                    </h5>
                </Card.Header>
                <Card.Body className="px-4 py-3">
                    <form ref={node => form = node}
                          className="needs-validation" noValidate
                          onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row mb-2">
                            <label htmlFor="name" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.name"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="name" className="form-control"
                                       value={name}
                                       onChange={e => setName(e.target.value)}
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="shortDescription" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.shortDescription"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="shortDescription" className="form-control"
                                       value={shortDescription}
                                       onChange={e => setShortDescription(e.target.value)}
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2" style={{ minHeight: '100%', height: 'auto' }}>
                            <label htmlFor="longDescription" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.longDescription"/>
                            </label>
                            <div className="col-md-9">
                                <textarea
                                    id="longDescription"
                                    className="form-control"
                                    value={longDescription}
                                    onChange={e => setLongDescription(e.target.value)}
                                    required
                                    style={{ minHeight: '100px', height: 'auto', resize: 'none' }}
                                />
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="locality" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.locality"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="locality" className="form-control"
                                       value={locality}
                                       onChange={e => setLocality(e.target.value)}
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="schedule" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.schedule"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="schedule" className="form-control"
                                       value={schedule}
                                       onChange={e => setSchedule(e.target.value)}
                                       placeholder="Lunes y Jueves de 17:00 a 19:30"
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="capacity" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.capacity"/>
                            </label>
                            <div className="col-md-4">
                                <input type="number" id="capacity" className="form-control"
                                       value={capacity}
                                       onChange={e => setCapacity(parseInt(e.target.value))}
                                       required
                                       min={0}/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="preferableVolunteer" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.preferableVolunteer"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="preferableVolunteer" className="form-control"
                                       value={preferableVolunteer}
                                       onChange={e => setPreferableVolunteer(e.target.value)}
                                       placeholder="Cualquiera, pero preferimos a estudiantes"
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="areChildren" className="form-check-label">
                                        <FormattedMessage id="project.global.fields.areChildren"/>
                                    </label>
                                    <input type="checkbox" id="areChildren" className="form-check-input ms-2"
                                           checked={areChildren}
                                           onChange={e => setAreChildren(e.target.checked)}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row mb-2">
                            <div className="col-md-4">
                                <div>
                                    <label htmlFor="isVisible" className="form-check-label">
                                        <FormattedMessage id="project.global.fields.isVisible"/>
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="isVisible"
                                        className="form-check-input ms-2"
                                        checked={isVisible}
                                        onChange={e => setIsVisible(e.target.checked)}
                                    />
                                </div>
                            </div>
                        </div>
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
                                    isInvalid={selectEmptyError}
                                />
                                {selectEmptyError && (
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="collaborationArea" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.collaborationArea"/>
                            </label>
                            <div className="col-md-4">
                                <Select
                                    options={optionsAreas}
                                    value={selectedArea}
                                    onChange={setSelectedArea}
                                    isSearchable={true}
                                    isMulti={false}
                                    isClearable={false}
                                    isInvalid={selectEmptyError}
                                />
                                {selectEmptyError && (
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="preferableVolunteer" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.tasks"/>
                            </label>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div>
                                            <div className="d-flex mb-3">
                                                <FormControl
                                                    type="text"
                                                    placeholder={intl.formatMessage({ id: 'project.created.new.task'})}
                                                    value={inputValue}
                                                    onChange={handleInputChange}
                                                    className="me-3"
                                                />
                                                <Button onClick={handleAddButtonClick} className="buttonGrey">
                                                    {intl.formatMessage({ id: 'project.common.add.title'})}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <ListGroup>
                                        {tasks.map((task, index) => (
                                            <ListGroupItem className="list-item" key={index}>
                                                {task}
                                                <Button
                                                    variant="danger"
                                                    className="delete-button"
                                                    onClick={() => handleDeleteButtonClick(index)}
                                                >
                                                    {intl.formatMessage({ id: 'project.common.delete.title'})}
                                                </Button>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-2">
                                    <button type="submit" className="buttonSecondary btn btn-primary">
                                        <FormattedMessage id="project.global.buttons.create.Project"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );

}

export default CreateProject;