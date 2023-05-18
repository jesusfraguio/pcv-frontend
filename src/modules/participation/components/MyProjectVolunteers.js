import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link, useNavigate} from 'react-router-dom';

import React from 'react';
import Table from 'react-bootstrap/Table';
import {Button, Dropdown, Row, Col} from "react-bootstrap";
import './Participations.css';

const MyProjectVolunteers = ({ participations, setOrderBy, setOrderType, orderBy, orderType}) => {

    const intl = useIntl();

    const getOrderTypeDisplay = (orderType) => {
        switch(orderType) {
            case 'asc':
                return intl.formatMessage({id : 'project.global.sort.asc'});
            case 'desc':
                return intl.formatMessage({id : 'project.global.sort.desc'});
            default:
                return intl.formatMessage({id : 'project.global.sort.asc'});
        }
    };
    const getOrderByDisplay = (orderBy) => {
        switch(orderBy) {
            case 'state':
                return intl.formatMessage({id : 'project.global.state.title'});
            case 'volunteerName':
                return intl.formatMessage({id : 'project.global.fields.firstName'});
            case 'volunteerSurname':
                return intl.formatMessage({id : 'project.global.fields.lastName'});
            case 'totalHours':
                return intl.formatMessage({id : 'project.totalHours.title'});
            default:
                return intl.formatMessage({id : 'project.global.sort.orderBy'});
        }
    };

    function getMessage(status) {
        switch (status) {
            case 'PENDING':
                return intl.formatMessage({id : 'project.status.Pending'});
            case 'SCHEDULED':
                return intl.formatMessage({id : 'project.status.Scheduled'});
            case 'APPROVED':
                return intl.formatMessage({id : 'project.status.Approved'});
            case 'ACCEPTED':
                return intl.formatMessage({id : 'project.status.Accepted'});
            case 'REJECTED':
                return intl.formatMessage({id : 'project.status.Rejected'});
            case 'DELETED':
                return intl.formatMessage({id : 'project.status.Deleted'});
            default:
                return status;
        }
    }

    return (
        <div>
            <Row style={{ justifyContent: 'flex-end' }}>
                <Col xs="auto">
                    <Dropdown onSelect={(key) => setOrderBy(key)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {getOrderByDisplay(orderBy)}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="state">{intl.formatMessage({id : 'project.global.state.title'})}</Dropdown.Item>
                            <Dropdown.Item eventKey="volunteerName">{intl.formatMessage({id : 'project.global.fields.firstName'})}</Dropdown.Item>
                            <Dropdown.Item eventKey="volunteerSurname">{intl.formatMessage({id : 'project.global.fields.lastName'})}</Dropdown.Item>
                            <Dropdown.Item eventKey="totalHours">{intl.formatMessage({id : 'project.totalHours.title'})}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                {orderBy != null && <Col xs="auto">
                    <Dropdown onSelect={(key) => setOrderType(key)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {getOrderTypeDisplay(orderType)}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="asc">Ascending</Dropdown.Item>
                            <Dropdown.Item eventKey="desc">Descending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col> }
            </Row>
            <Table>
                <thead>
                <tr>
                    <th>{intl.formatMessage({id : 'project.global.fields.name'})}</th>
                    <th>{intl.formatMessage({id : 'project.global.fields.lastName'})}</th>
                    <th>{intl.formatMessage({id : 'project.totalHours.title'})}</th>
                    <th>{intl.formatMessage({id : 'project.status.their.title'})}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {participations.map((participation, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={`/users/${participation.volunteerId}`} className="name-link">
                                {participation.volunteerName}
                            </Link>
                        </td>
                        <td>{participation.volunteerSurname}</td>
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
        </div>
    );
};

export default MyProjectVolunteers;