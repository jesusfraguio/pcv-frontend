import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link, useNavigate} from 'react-router-dom';

import React from 'react';
import Table from 'react-bootstrap/Table';
import {Button} from "react-bootstrap";
import './Participations.css';

const MyParticipations = ({ myParticipations }) => {

    function getMessage(status) {
        switch (status) {
            case 'PENDING':
                return intl.formatMessage({id : 'project.status.Pending'});
            case 'APPROVED':
                return intl.formatMessage({id : 'project.status.Approved'});
            case 'ACCEPTED':
                return intl.formatMessage({id : 'project.status.Accepted'});
            default:
                return status;
        }
    }

    const intl = useIntl();
    return (
        <Table>
            <thead>
            <tr>
                <th>{intl.formatMessage({id : 'project.projectName.title'})}</th>
                <th>{intl.formatMessage({id : 'project.totalHours.title'})}</th>
                <th>{intl.formatMessage({id : 'project.status.title'})}</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {myParticipations.map((participation, index) => (
                <tr key={index}>
                    <td>
                        <Link to={`/projects/${participation.projectId}`} className="name-link">
                        {participation.projectName}
                        </Link>
                    </td>
                    <td>{participation.totalHours}</td>
                    <td className={`status-${participation.status.toLowerCase()}`}>{getMessage(participation.status)}</td>
                    <td style={{border: 'none'}}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                            {participation.status === 'APPROVED' &&
                                <Button variant="primary" className="mainButton">
                                    {intl.formatMessage({id : 'project.upload.uploadSignedCert'})}</Button>
                            }
                            {participation.status === 'APPROVED' &&
                                <Button variant="primary" className="mainButton">
                                    {intl.formatMessage({id : 'project.upload.downloadSignedCertByEntity'})}</Button>
                            }
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default MyParticipations;