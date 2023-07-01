import React, {useEffect, useState} from 'react';
import {Calendar, Views, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './Calendar.css';
import {FormattedMessage, useIntl} from "react-intl";
import 'moment/locale/es';
import {useNavigate} from "react-router-dom";
import {Alert, Button, Form, Modal} from "react-bootstrap";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { es, enGB, gl } from 'date-fns/locale';
import Select from "react-select";
import {useDispatch} from "react-redux";
import * as actions from "../actions";
import {Errors} from "../../common";
const involvements = [
    {
        id: 1,
        userName: 'Pedro Sánchez Sánchez',
        projectName: 'Projecto X',
        date: '2023-06-25',
        numberOfHours: 15,
    },
    {
        id: 2,
        userName: 'Luís Fernández González',
        projectName: 'Projecto X',
        date: '2023-06-25',
        numberOfHours: 10,
    },
    {
        id: 3,
        userName: 'Pedro Sánchez Sánchez',
        projectName: 'Limpieza de playas',
        date: '2023-06-25',
        numberOfHours: 2,
    },
    {
        id: 3,
        userName: 'Jaime Smith',
        projectName: 'Limpieza de playas',
        date: '2023-06-25',
        numberOfHours: 10,
    },
    {
        id: 4,
        userName: 'Pepe López López',
        projectName: 'Limpieza de playas',
        date: '2023-06-25',
        numberOfHours: 10,
    },
    {
        id: 5,
        userName: 'Pepe López López',
        projectName: 'Limpieza de playas',
        date: '2023-06-25',
        numberOfHours: 10,
    },
    {
        id: 6,
        userName: 'Rafael Nadal',
        projectName: 'Limpieza de playas',
        date: '2023-06-25',
        numberOfHours: 10,
    },
    {
        id: 7,
        userName: 'Rafael Nadal',
        projectName: 'Limpieza de playas',
        date: '2023-06-25',
        numberOfHours: 10,
    },
    {
        id: 8,
        userName: 'Rafael Nadal',
        projectName: 'Limpieza de playas',
        date: '2023-06-25',
        numberOfHours: 10,
    },
    {
        id: 9,
        userName: 'Pedro Sánchez Sánchez',
        projectName: 'Projecto X',
        date: '2023-06-26',
        numberOfHours: 2,
    },
];

const UpdateInvolvementHours = () => {
    const { locale } = useIntl();
    const intl = useIntl();
    const languageCode = intl.locale.split('-')[0];
    const dispatch = useDispatch();

    moment.locale(locale);
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDate, setSelectedDate] = useState(moment(new Date()).startOf('week').toDate());
    const [addParticipation, setAddParticipation] = useState(false);
    const [viewType,setViewType] = useState('week');
    const [projectList, setProjectList] = useState([]);
    const [selectedProject,setSelectedProject] = useState(null);

    const [participationList, setParticipationList] = useState([]);
    const [selectedParticipation,setSelectedParticipation] = useState(null);

    const [backendErrors, setBackendErrors] = useState('');
    const [success, setSuccess] = useState(false);
    const [selectEmptyError, setSelectEmptyError] = useState(false);
    const [hours, setHours] = useState(null);

    let form;

    const messages = {
        today: <FormattedMessage id="calendar.label.today"/>,
        previous: <FormattedMessage id="calendar.label.previous"/>,
        next: <FormattedMessage id="calendar.label.next"/>,
        month: <FormattedMessage id="calendar.label.month"/>,
        week: <FormattedMessage id="calendar.label.week"/>,
        day: <FormattedMessage id="calendar.label.day"/>,
        agenda: <FormattedMessage id="calendar.label.agenda"/>,
    };

    useEffect(() => {
        const newEvents = involvements.map((involvement) => {
            const { date, numberOfHours, projectName, userName } = involvement;
            const start = moment(date, 'YYYY-MM-DD').toDate();
            return {
                title: `${userName} - ${projectName} - ${numberOfHours}`,
                date,
                projectName,
                userName,
                numberOfHours,
                start,
                end: start,
                allDay: true,
            };
        });
        setEvents(newEvents);
    }, [involvements]);


    useEffect(() => {
        if(addParticipation){
            actions.getAllMyProjectsName(data => setProjectList(data?.map(item => ({ value: item.id, label: item.name }))),
                    errors => setBackendErrors(errors));
        }
    }, [addParticipation]);

    useEffect(() => {
        if(selectedProject){
            actions.getAllProjectParticipationName(selectedProject.value,data => setParticipationList(data?.map(item => ({ value: item.id, label: item.name }))),
                errors => setBackendErrors(errors));
        }
    }, [selectedProject]);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };
    const handleSuccessClose = () => {
        setSuccess(false);
    };
    const handleCloseAddModal = () => {
      setAddParticipation(false);
    };

    const handleAddParticipation = () => {
        setAddParticipation(true);
    };

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            if (!selectedParticipation || !selectedProject) {
                setSelectEmptyError(true);
                return;
            }

            actions.addNewParticipationHourRegister({participationId: selectedParticipation.value,
                hours: hours,
                date: selectedDate.toISOString().split('T')[0]},
                newParticipation => {handleCloseAddModal(); setSuccess(true);},
                errors => setBackendErrors(errors));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    }

    return (
        <div className="my-calendar">
            {backendErrors && <Errors errors={backendErrors} onClose={() => setBackendErrors('')} />}
            <Button variant="primary" className="buttonSecondary btn btn-primary mb-2" onClick={handleAddParticipation}>
                {intl.formatMessage({id: 'project.global.buttons.save'})}
            </Button>
            <Calendar
                localizer={localizer}
                events={events}
                onNavigate = {(date, view) => {
                    if(view === Views.DAY){
                        if(viewType!=='day') {
                            setViewType('day');
                        }
                        setSelectedDate(date);
                    }
                    else if (view === Views.WEEK){
                        if(viewType!=='week') {
                            setViewType('week');
                        }
                        setSelectedDate(moment(date).startOf('week').toDate());
                    }
                }}
                startAccessor="date"
                endAccessor="date"
                defaultView={Views.WEEK}
                views={['week', 'day']}
                tooltipAccessor={null}
                components={{
                    event: ({ event }) => (
                        <div title={`${event.userName} - ${event.numberOfHours} horas`}
                             onClick={() => handleEventClick(event)}>
                            {event.title}
                        </div>
                    ),
                }}
                formats={{
                    timeGutterFormat: () => '',
                }}
                messages={messages}
            />
            <Modal show={selectedEvent !== null} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Event Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent !== null && (
                        <>
                            <h1>{selectedEvent.userName}</h1>
                            <h1>{selectedEvent.projectName}</h1>
                            <p>{selectedEvent.userName}</p>
                            <p>{selectedEvent.numberOfHours} horas</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            {success &&
                <Modal show={success} onHide={handleSuccessClose} centered>
                    <Modal.Body closeButton>
                        <Alert variant="success" onClose={handleSuccessClose} dismissible>
                            <FormattedMessage id="project.global.message.ok" />
                        </Alert>
                    </Modal.Body>
                </Modal>
            }
            <Modal show={addParticipation} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{intl.formatMessage({id: "project.global.message.register.hours"})}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {addParticipation && (
                        <Form ref={node => form = node}
                              className="needs-validation" noValidate
                              onSubmit={e => handleSubmit(e)}>
                            <DayPicker
                                mode="single"
                                required
                                selected={selectedDate}
                                initialMonth={selectedDate}
                                onSelect={setSelectedDate}
                                locale={languageCode==='es' ? es : (languageCode==='gl' ? gl : enGB)}
                                footer={<p className="mt-2">{intl.formatDate(selectedDate, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</p>}
                            />
                            <div className="form-group row mb-2">
                                <label htmlFor="collaborationArea" className="col-md-3 col-form-label">
                                    <FormattedMessage id="project.global.fields.project"/>
                                </label>
                                <Select
                                    options={projectList}
                                    value={selectedProject}
                                    onChange={setSelectedProject}
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

                            {selectedProject && <div className="form-group row mb-2">
                                <label htmlFor="collaborationArea" className="col-md-3 col-form-label">
                                    <FormattedMessage id="project.global.fields.volunteer"/>
                                </label>
                                <Select className="mt-2"
                                        options={participationList}
                                        value={selectedParticipation}
                                        onChange={setSelectedParticipation}
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
                            }

                            <div className="form-group row mb-2">
                                <label htmlFor="collaborationArea" className="col-md-3 col-form-label">
                                    <FormattedMessage id="project.global.fields.project"/>
                                </label>
                                <div className="col-md-4">
                                    <input type="number" id="hours" className="form-control"
                                           value={hours}
                                           onChange={e => setHours(parseInt(e.target.value))}
                                           required
                                           min={0}/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" className="buttonSecondary btn-primary">
                                {intl.formatMessage({id : "project.global.buttons.createHoursRegister"})}
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseAddModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UpdateInvolvementHours;