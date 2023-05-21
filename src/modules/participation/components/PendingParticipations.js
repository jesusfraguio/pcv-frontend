import {FormattedMessage, useIntl} from 'react-intl';
import {Link, useNavigate} from 'react-router-dom';

import React from 'react';
import Table from 'react-bootstrap/Table';
import {Button, Dropdown, Row, Col} from "react-bootstrap";
import './Participations.css';

const PendingParticipations = ({ participations}) => {

    const intl = useIntl();

    function getMessage(status) {
        switch (status) {
            case 'PENDING':
                return intl.formatMessage({id : 'project.status.Pending'});
            default:
                return status;
        }
    }

    return (
        <div>
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
                                    <Button variant="primary" className="mainButton">
                                        {intl.formatMessage({id : 'project.global.buttons.scheduleMeeting'})}</Button>
                                }
                                {participation.status === 'PENDING' &&
                                    <Button variant="secondary" className="mainButton" style={{backgroundColor: '#CC4233'}}>
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