import {FormattedMessage, useIntl} from 'react-intl';
import {Link, useNavigate} from 'react-router-dom';

import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import {Button, Dropdown, Row, Col, Modal} from "react-bootstrap";
import './Participations.css';
import * as participationAction from "../actions";
import {useDispatch} from "react-redux";

const PendingParticipations = ({ participations}) => {

    const intl = useIntl();
    const [showModal, setShowModal] = useState(false);
    const [success,setSuccess] = useState('');

    const dispatch = useDispatch();
    function getMessage(status) {
        switch (status) {
            case 'PENDING':
                return intl.formatMessage({id : 'project.status.Pending'});
            default:
                return status;
        }
    }

    const handleClose = () => setShowModal(false);

    const handleSchedule = (id) => {
        dispatch(participationAction.updateParticipation(id,"SCHEDULED",
            message => {
                setSuccess('OK');
                setShowModal(true);
                dispatch(participationAction.removeParticipation(id));
            }
        ));
    };
    const handleReject = (id) => {
        dispatch(participationAction.updateParticipation(id,"REJECTED",
            message => {
                setSuccess('OK');
                setShowModal(true);
                dispatch(participationAction.removeParticipation(id));
            }
        ));
    };

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Éxito</Modal.Title>
                </Modal.Header>
                <Modal.Body>{success}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table>
                <thead>
                <tr>
                    <th> {intl.formatMessage({id: 'project.global.fields.project'})}</th>
                    <th>{intl.formatMessage({id : 'project.global.fields.name'})}</th>
                    <th>{intl.formatMessage({id : 'project.global.fields.lastName'})}</th>
                    <th>{intl.formatMessage({id : 'project.status.their.title'})}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {participations.map((participation, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={`/projects/${participation.projectId}`} className="name-link">
                                {participation.projectName}
                            </Link>
                        </td>
                        <td>
                            <Link to={`/users/${participation.volunteerId}`} className="name-link">
                                {participation.volunteerName}
                            </Link>
                        </td>
                        <td>{participation.volunteerSurname}</td>
                        <td className={`status-${participation.status.toLowerCase()}`}>{getMessage(participation.status)}</td>
                        <td style={{border: 'none'}}>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                                {participation.status === 'PENDING' &&
                                    <Button variant="primary" className="mainButton" onClick={() => handleSchedule(participation.id)}>
                                        {intl.formatMessage({id : 'project.global.buttons.scheduleMeeting'})}</Button>
                                }
                                {participation.status === 'PENDING' &&
                                    <Button variant="secondary" className="mainButton" onClick={() => handleReject(participation.id)} style={{backgroundColor: '#CC4233'}}>
                                        {intl.formatMessage({id : 'project.global.buttons.reject'})}</Button>
                                }
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PendingParticipations;