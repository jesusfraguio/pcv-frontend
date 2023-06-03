import {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link, useNavigate} from 'react-router-dom';

import React from 'react';
import Table from 'react-bootstrap/Table';
import {Button, Modal} from "react-bootstrap";
import './Participations.css';
import * as participationAction from "../actions";
import {Errors, Success} from "../../common";

const MyParticipations = ({ myParticipations }) => {

    const dispatch = useDispatch();
    const participationId = useRef();
    const [showUploadCertModal, setShowUploadCertModal] = useState(false);
    const [success,setSuccess] = useState(null);
    const [failure,setFailure] = useState(null);

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

    const handleUploadSignedCert = (id) => {
        if(!showUploadCertModal) {
            participationId.current = id;
            setShowUploadCertModal(true);
        }

        else{
            const cert = document.getElementById('signedUploadCert');
            const formData = new FormData();
            formData.set('participationNumber',participationId.current);
            formData.append('cert', cert.files[0], cert.files[0].name);
            participationAction.uploadMySignedCert(formData,
                success => {
                    setShowUploadCertModal(false);
                    dispatch(participationAction.updateMyParticipationStatus(participationId.current,"ACCEPTED"));
                    setTimeout(() => {
                        setSuccess(intl.formatMessage({id: "project.upload.uploadSignedCertFull.success"}));
                    }, 600);
                },
                failure => {
                    setShowUploadCertModal(false);
                    setTimeout(() => {
                        setFailure(intl.formatMessage({id: "project.global.errors"}));
                    }, 600);
                }
            );
        }
    };

    const intl = useIntl();
    return (
        <div>
            <Errors errors={failure} onClose={() => setFailure(null)}/>
            <Success message={success} onClose={() => setSuccess(null)} />
            {showUploadCertModal && <Modal show={showUploadCertModal} onHide={() => setShowUploadCertModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{intl.formatMessage({id: 'project.upload.uploadSignedCertFull'})}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" id="signedUploadCert" onChange={handleUploadSignedCert} accept=".pdf" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUploadCertModal(false)}>
                        {intl.formatMessage({id: 'project.global.buttons.close'})}
                    </Button>
                </Modal.Footer>
            </Modal>
            }
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
                                <Button variant="primary" className="mainButton" onClick = {() => handleUploadSignedCert(participation.id)}>
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

export default MyParticipations;