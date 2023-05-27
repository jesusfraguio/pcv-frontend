import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage, useIntl} from 'react-intl';
import {useNavigate, useParams} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import {Button, Card, ListGroup} from "react-bootstrap";
import { FaEnvelope } from 'react-icons/fa';


const SeeVolunteerSummaryProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [volunteerSummary, setVolunteerSummary] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const intl = useIntl();

    useEffect(() => {
        dispatch(actions.seeVolunteerSummary(id,data => setVolunteerSummary(data), errors => setBackendErrors(errors)))
    }, [id]);

    if(!volunteerSummary){
        return null;
    }
    return (
        <Card style={{ width: '24rem', margin: 'auto', marginTop: '20px' }}>
            <Card.Body>
                <Card.Title className="text-center" style={{ fontWeight: 'bold' }}>
                    {volunteerSummary.name} {volunteerSummary.surname}
                </Card.Title>
                <div className="text-center" style={{
                    fontSize: '1.2em',
                    color: volunteerSummary.isVerified ? 'green' : 'red',
                    marginBottom: '10px'
                }}>
                    {volunteerSummary.isVerified ? intl.formatMessage({id: "project.users.isVerified.true"}) :
                        intl.formatMessage({id: "project.users.isVerified.false"})}
                </div>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <strong>{intl.formatMessage({id: "project.global.fields.email"})}</strong>
                        <br />
                        {volunteerSummary.email ? volunteerSummary.email : intl.formatMessage({id: "project.common.thereIsNot"})}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>{intl.formatMessage({id: "project.global.fields.phone"})}</strong>
                        <br />
                        {volunteerSummary.phone}
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>

            <Card.Footer className="text-muted d-flex justify-content-between">
                {volunteerSummary.email &&
                    <Button
                        variant="success"
                        size="sm"
                        href={`mailto:${volunteerSummary.email}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#28a745',
                            marginRight: '10px'
                        }}
                    >
                        <FaEnvelope style={{ marginRight: '5px', fontSize: '32px'}}/>
                        <span style={{ marginLeft: '5px' }}>{intl.formatMessage({id: "project.actions.sendEmail"})}</span>
                    </Button>}
                {volunteerSummary.hasCertFile ?
                    <Button variant="primary" size="sm" style={{marginRight: '10px'}} className="mainButton">
                    {intl.formatMessage({id: "project.upload.downloadSignedCertByEntity"})}</Button>
                : <Button variant="primary" size="sm" style={{marginRight: '10px'}} className="mainButton">
                        {intl.formatMessage({id: "project.upload.uploadSignedCert"})}</Button>}

                {volunteerSummary.verified ?
                    <Button variant="primary" size="sm" style={{marginRight: '10px'}} className="mainButton">
                        {intl.formatMessage({id: "project.upload.downloadDNI"})}</Button>
                    : <Button variant="primary" size="sm" style={{marginRight: '10px'}} className="mainButton">
                        {intl.formatMessage({id: "project.upload.uploadDNI"})}</Button>
                }
                {volunteerSummary.verified && (
                    <>
                        {volunteerSummary.hasHarassmentFile ? (
                            <Button variant="primary" size="sm" style={{ marginRight: '10px' }} className="mainButton">
                                {intl.formatMessage({ id: "project.upload.downloadHarassmentFile" })}
                            </Button>
                        ) : (
                            <Button variant="primary" size="sm" style={{ marginRight: '10px' }} className="mainButton">
                                {intl.formatMessage({ id: "project.upload.uploadHarassmentFile" })}
                            </Button>
                        )}
                    </>
                )}
            </Card.Footer>
        </Card>
    );


}

export default SeeVolunteerSummaryProfile;