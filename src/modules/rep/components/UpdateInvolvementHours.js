import React, {useEffect, useState} from 'react';
import {Calendar, Views, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './Calendar.css';
import {FormattedDate, FormattedMessage, useIntl} from "react-intl";
import 'moment/locale/es';
import {Alert, Button, Col, Form, Modal, Row} from "react-bootstrap";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { es, enGB, gl } from 'date-fns/locale';
import Select from "react-select";
import {useDispatch} from "react-redux";
import * as actions from "../actions";
import {Errors} from "../../common";
import {Link} from "react-router-dom";

const UpdateInvolvementHours = ({involvements, projectList, setStartDate, filterProject}) => {
    const { locale } = useIntl();
    const intl = useIntl();
    const languageCode = intl.locale.split('-')[0];    // es, en.... any language supported by react-intl
    const dispatch = useDispatch();

    moment.locale(locale);
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDate, setSelectedDate] = useState(moment(new Date()).startOf('month').toDate());
    const [month, setMonth] = useState(moment(new Date()).startOf('month').toDate().getMonth())
    const [addParticipation, setAddParticipation] = useState(false);
    const [viewType,setViewType] = useState('week');
    const [selectedProject,setSelectedProject] = useState(null);

    const [participationList, setParticipationList] = useState([]);
    const [selectedParticipation,setSelectedParticipation] = useState(null);

    const [backendErrors, setBackendErrors] = useState('');
    const [success, setSuccess] = useState(false);
    const [selectEmptyError, setSelectEmptyError] = useState(false);
    const [hours, setHours] = useState(0);

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
            const { date, hours, volunteerName, volunteerId, id} = involvement;
            const date2 =  new Date(date[0], date[1]-1, date[2]);
            const start = moment(date2, 'YYYY-MM-DD').toDate();
            return {
                id,
                title: `${volunteerName} - ${hours}`,
                date: date2,
                volunteerName,
                volunteerId,
                hours,
                start,
                end: start,
                allDay: false,
            };
        });
        setEvents(newEvents);
    }, [involvements]);

    useEffect(() => {
        const startDate = new Date((new Date()).getFullYear(), month , 1);
        setStartDate(startDate);
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [month]);

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
        setSelectedEvent(null);
    };
    const handleCloseAddModal = () => {
      setAddParticipation(false);
    };

    const handleAddParticipation = () => {
        setAddParticipation(true);
    };

    const handleDeleteParticipation = (id) => {
        actions.deleteHourRegister(id, (success) => {
            dispatch(actions.updateDeleteParticipationHour(id));
            setSuccess(true);
        }, (errors) => setBackendErrors(errors));
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
                date: new Date(selectedDate.getTime()+86400000).toISOString().split('T')[0]},
                newParticipation => {
                    dispatch(actions.updateParticipationHour(newParticipation));
                    handleCloseAddModal();
                    setSuccess(true);
                },
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
                {intl.formatMessage({id: 'project.global.buttons.addNewRegister'})}
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
                        if(date.getMonth() !== month){
                            setMonth(date.getMonth());
                        }
                    }
                    else if (view === Views.WEEK){
                        if(viewType!=='week') {
                            setViewType('week');
                        }
                        const newDate = moment(date).startOf('week').toDate();
                        if(newDate.getMonth() !== month){
                            setMonth(newDate.getMonth());
                        }
                        setSelectedDate(newDate);
                    }
                    else if(view === Views.MONTH){
                        const newDate = moment(date).startOf('month').toDate();
                        if(newDate.getMonth() !== month){
                            setMonth(newDate.getMonth());
                        }
                        setSelectedDate(newDate);
                    }
                }}
                startAccessor="date"
                endAccessor="date"
                defaultView={Views.WEEK}
                views={['week', 'day', 'month']}
                tooltipAccessor={null}
                components={{
                    event: ({ event }) => (
                        <div title={`${event.volunteerName} - ${event.hours} horas`}
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
                    <Modal.Title>{intl.formatMessage({id: "project.participation.hourRegister.detail"})}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent !== null && (
                        <>
                            <h1><Link to={`/users/${selectedEvent.volunteerId}`} className="name-link">
                                {selectedEvent.volunteerName}
                            </Link></h1>
                            <h1><Link to={`/projects/${filterProject?.value}`} className="name-link">
                                {filterProject?.label}
                            </Link></h1>
                            <Row>
                                <Col>
                                    <p>
                                        <FormattedDate value={selectedEvent.date} />
                                    </p>
                                    <p>
                                        {selectedEvent.hours + ' '}
                                        {intl.formatMessage({ id: 'project.global.fields.hours' })}
                                    </p>
                                </Col>
                            </Row>
                        </>
                    )}
                    <Button variant="primary" className="btn-danger mb-2" onClick={() => handleDeleteParticipation(selectedEvent.id)}>
                        <FormattedMessage id="project.participation.hourRegister.delete" />
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal}><FormattedMessage id="project.global.buttons.close"/></Button>
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
                                <label htmlFor="project" className="col-md-3 col-form-label">
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
                                <label htmlFor="volunteer" className="col-md-3 col-form-label">
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
                                <label htmlFor="hours" className="col-md-3 col-form-label">
                                    <FormattedMessage id="project.global.fields.hours"/>
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
                    <Button onClick={handleCloseAddModal}>{intl.formatMessage({id : "project.global.buttons.close"})}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UpdateInvolvementHours;