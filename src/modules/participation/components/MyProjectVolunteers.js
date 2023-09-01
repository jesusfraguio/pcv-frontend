import {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link, useNavigate} from 'react-router-dom';

import React from 'react';
import Table from 'react-bootstrap/Table';
import {Button, Dropdown, Row, Col, Modal} from "react-bootstrap";
import './Participations.css';
import * as participationAction from "../actions";
import {Errors, Success} from "../../common";

const MyProjectVolunteers = ({
                                 participations,
                                 setOrderBy,
                                 setOrderType,
                                 orderBy,
                                 orderType,
                                 projectId,
                                 projectName,
                                 selectedYear
                             }) => {

    const intl = useIntl();

    const dispatch = useDispatch();
    const participationId = useRef();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [showUploadCertModal, setShowUploadCertModal] = useState(false);
    const [success, setSuccess] = useState(null);
    const [failure, setFailure] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const deletingId = useRef(null);

    function handleSeeAvailableVolunteers(id, name) {
        navigate(`/see-all-volunteers/${id}/${name}`);
    }

    const getOrderTypeDisplay = (orderType) => {
        switch (orderType) {
            case 'asc':
                return intl.formatMessage({id: 'project.global.sort.asc'});
            case 'desc':
                return intl.formatMessage({id: 'project.global.sort.desc'});
            default:
                return intl.formatMessage({id: 'project.global.sort.asc'});
        }
    };
    const getOrderByDisplay = (orderBy) => {
        switch (orderBy) {
            case 'state':
                return intl.formatMessage({id: 'project.global.state.title'});
            case 'volunteerName':
                return intl.formatMessage({id: 'project.global.fields.firstName'});
            case 'volunteerSurname':
                return intl.formatMessage({id: 'project.global.fields.lastName'});
            case 'totalHours':
                return intl.formatMessage({id: 'project.totalHours.title'});
            default:
                return intl.formatMessage({id: 'project.global.sort.orderBy'});
        }
    };

    function getMessage(status) {
        switch (status) {
            case 'PENDING':
                return intl.formatMessage({id: 'project.status.Pending'});
            case 'SCHEDULED':
                return intl.formatMessage({id: 'project.status.Scheduled'});
            case 'APPROVED':
                return intl.formatMessage({id: 'project.status.Approved'});
            case 'ACCEPTED':
                return intl.formatMessage({id: 'project.status.Accepted'});
            case 'REJECTED':
                return intl.formatMessage({id: 'project.status.Rejected'});
            case 'DELETED':
                return intl.formatMessage({id: 'project.status.Deleted'});
            default:
                return status;
        }
    }

    const handleApprove = (id) => {
        dispatch(participationAction.updateParticipation(id, "APPROVED",
            message => {
                setSuccess(intl.formatMessage({id: "project.global.message.ok"}));
                setShowModal(true);
                dispatch(participationAction.updateProjectVolunteers(id, "APPROVED"));
            }
        ));
    };
    const handleAccept = (id) => {
        dispatch(participationAction.updateParticipation(id, "ACCEPTED",
            message => {
                setSuccess(intl.formatMessage({id: "project.global.message.ok"}));
                setShowModal(true);
                dispatch(participationAction.updateProjectVolunteers(id, "ACCEPTED"));
            },
            errors => {
                if(errors.globalError?.includes("HARASSMENT_CERT")){
                    errors.globalError = intl.formatMessage({id: 'project.participation.rep.requiredHarassmentCert'});
                    setFailure(errors);
                }
                else if(errors.globalError?.includes("DNI")){
                    errors.globalError = intl.formatMessage({id: 'project.participation.rep.requiredDni'});
                    setFailure(errors);
                }
                else{
                    handleUploadSignedCert(id);
                }
            }
        ));
    };
    const handleUploadSignedCert = (id) => {
        if (!showUploadCertModal) {
            participationId.current = id;
            setShowUploadCertModal(true);
        } else {
            const cert = document.getElementById('signedUploadCert');
            const formData = new FormData();
            formData.set('participationNumber', participationId.current);
            formData.append('cert', cert.files[0], cert.files[0].name);
            participationAction.uploadMyVolunteerSignedCert(formData,
                success => {
                    setShowUploadCertModal(false);
                    dispatch(participationAction.updateProjectVolunteers(participationId.current, "ACCEPTED"));
                    setTimeout(() => {
                        setSuccess(intl.formatMessage({id: "project.upload.uploadSignedCertFull.success"}));
                        setShowModal(true);
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

    const confirmDelete = () => {
        setShowConfirmationModal(false);
        dispatch(participationAction.updateParticipation(deletingId.value, "DELETED",
            message => {
                setSuccess(intl.formatMessage({id: "project.global.message.ok"}));
                setShowModal(true);
                dispatch(participationAction.updateProjectVolunteers(deletingId.value, "DELETED"));
                deletingId.value = null;
            }
        ));
    };
    const handleDelete = (id) => {
        setShowConfirmationModal(true);
        deletingId.value = id;
    };
    const handleReject = (id) => {
        dispatch(participationAction.updateParticipation(id, "REJECTED",
            message => {
                setSuccess(intl.formatMessage({id: "project.global.message.reject.ok"}));
                setShowModal(true);
                dispatch(participationAction.updateProjectVolunteers(id, "REJECTED"));
            }
        ));
    };

    return (
        <div>
            <Errors errors={failure} onClose={() => setFailure(null)}/>
            <Button variant="primary" className="mainButton"
                    onClick={() => handleSeeAvailableVolunteers(projectId, projectName)}>
                {intl.formatMessage({id: 'project.project.addParticipant.title'})}</Button>
            {participations.length === 0 &&
                <div className="alert alert-info mt-4" role="alert">
                    <FormattedMessage id='project.participations.noParticipationsFound'/>
                </div>
            }

            {participations.length !== 0 &&
            <div>
            <Row style={{justifyContent: 'flex-end'}}>
                <Col xs="auto">
                    <Dropdown onSelect={(key) => setOrderBy(key)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {getOrderByDisplay(orderBy)}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item
                                eventKey="state">{intl.formatMessage({id: 'project.global.state.title'})}</Dropdown.Item>
                            <Dropdown.Item
                                eventKey="volunteerName">{intl.formatMessage({id: 'project.global.fields.firstName'})}</Dropdown.Item>
                            <Dropdown.Item
                                eventKey="volunteerSurname">{intl.formatMessage({id: 'project.global.fields.lastName'})}</Dropdown.Item>
                            <Dropdown.Item
                                eventKey="totalHours">{intl.formatMessage({id: 'project.totalHours.title'})}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                {orderBy != null && <Col xs="auto">
                    <Dropdown onSelect={(key) => setOrderType(key)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {getOrderTypeDisplay(orderType)}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item
                                eventKey="asc">{intl.formatMessage({id: 'project.global.sort.asc'})}</Dropdown.Item>
                            <Dropdown.Item
                                eventKey="desc">{intl.formatMessage({id: 'project.global.sort.desc'})}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>}
            </Row>
            {
                showModal &&
                <Success message={success} onClose={() => {
                    setSuccess('');
                    setShowModal(false);
                }}/>
            }
            {showUploadCertModal && <Modal show={showUploadCertModal} onHide={() => setShowUploadCertModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{intl.formatMessage({id: 'project.upload.uploadSignedCertRepresentativeFull'})}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" id="signedUploadCert" onChange={handleUploadSignedCert} accept=".pdf"/>
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
                    <th>{intl.formatMessage({id: 'project.global.fields.name'})}</th>
                    <th>{intl.formatMessage({id: 'project.global.fields.lastName'})}</th>
                    <th>{!selectedYear ? intl.formatMessage({id: 'project.totalHours.title'}) : intl.formatMessage({id: 'project.totalHours.year.title'}, {year : selectedYear.label}) }</th>
                    <th>{intl.formatMessage({id: 'project.status.their.title'})}</th>
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
                        <td>{selectedYear ? participation.yearHours : participation.totalHours}</td>
                        <td className={`status-${participation.status.toLowerCase()}`}>{getMessage(participation.status)}</td>
                        <td style={{border: 'none'}}>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                                {showConfirmationModal &&
                                    <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>{intl.formatMessage({id: 'project.global.confirmation'})}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>{intl.formatMessage(
                                            {id: 'project.participation.sureToDeleteParticipation'},
                                            {
                                                name: participations.find(participation => participation.id === deletingId.value).volunteerName,
                                                surname: participations.find(participation => participation.id === deletingId.value).volunteerSurname
                                            }
                                        )}</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
                                                {intl.formatMessage({id: 'project.global.buttons.cancel'})}</Button>
                                            <Button variant="danger" onClick={() => confirmDelete()}>
                                                {intl.formatMessage({id: 'project.global.buttons.participation.confirmDelete'})}</Button>
                                        </Modal.Footer>
                                    </Modal>
                                }
                                {participation.status === 'APPROVED' &&
                                    <Button variant="primary" className="mainButton"
                                            onClick={() => handleAccept(participation.id)}>
                                        {intl.formatMessage({id: 'project.global.buttons.accept'})}</Button>
                                }
                                {participation.status === 'APPROVED' &&
                                    <Button variant="secondary" className="mainButton"
                                            onClick={() => handleDelete(participation.id)}
                                            style={{backgroundColor: '#CC4233'}}>
                                        {intl.formatMessage({id: 'project.global.buttons.delete'})}</Button>
                                }
                                {participation.status === 'SCHEDULED' &&
                                    <Button variant="primary" className="mainButton"
                                            onClick={() => handleApprove(participation.id)}>
                                        {intl.formatMessage({id: 'project.global.buttons.approve'})}</Button>
                                }
                                {participation.status === 'SCHEDULED' &&
                                    <Button variant="primary" className="mainButton"
                                            onClick={() => handleReject(participation.id)}
                                            style={{backgroundColor: '#CC4233'}}>
                                        {intl.formatMessage({id: 'project.global.buttons.reject'})}</Button>
                                }
                                {participation.status === 'ACCEPTED' &&
                                    <Button variant="secondary" className="mainButton"
                                            onClick={() => handleDelete(participation.id)}
                                            style={{backgroundColor: '#CC4233'}}>
                                        {intl.formatMessage({id: 'project.global.buttons.delete'})}</Button>
                                }
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </div>
            }
        </div>
    );
};

export default MyProjectVolunteers;