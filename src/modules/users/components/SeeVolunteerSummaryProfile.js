import {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage, useIntl} from 'react-intl';
import {useParams} from 'react-router-dom';

import {Errors, Success} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {Button, Card, Form, ListGroup, Modal} from "react-bootstrap";
import {FaEnvelope, FaUpload} from 'react-icons/fa';


const SeeVolunteerSummaryProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const isRepresentative = useSelector(selectors.isRepresentative);
    const [volunteerSummary, setVolunteerSummary] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [onlyUpload, setOnlyUpload] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const dniInputRef = useRef(null);
    const photoInputRef = useRef(null);
    const harassmentCertInputRef = useRef(null);
    const intl = useIntl();

    const handleToggle = () => {
        setShowUploadModal(true);
    };

    const handleUploadDni = () => {
        setShowUploadModal(true);
    };

    const handleDownload = (fileType) => {
        dispatch(actions.downloadFile(id,fileType));
    }

    const handleUpload = () => {
        const dniInput = dniInputRef.current;
        const cert = harassmentCertInputRef.current;
        const photo = photoInputRef.current;
        if(!dniInput && !cert && !photo){
            return ;
        }
        const formData = new FormData();
        if(dniInput.files.length > 0){
            formData.append('dni', dniInput.files[0], dniInput.files[0].name);
        }
        if(cert.files.length > 0){
            formData.append('harassmentCert', cert.files[0], cert.files[0].name);
        }
        if(photo.files.length > 0){
            formData.append('photo', photo.files[0], photo.files[0].name);
        }
        dispatch(actions.updateVolunteerDocs(formData,id,
            message => {
            setSuccess(intl.formatMessage({id: "project.global.message.ok"}));
                if (cert) {
                    cert.value = '';
                }
                if (photo) {
                    photo.value = '';
                }
                if (dniInput) {
                    dniInput.value = '';
                }
            },
            errors => setBackendErrors(errors),
        ));
    }

    useEffect(() => {
        dispatch(actions.seeVolunteerSummary(id,data => setVolunteerSummary(data), errors => setBackendErrors(errors)))
    } // eslint-disable-next-line react-hooks/exhaustive-deps
    , [id]);

    if(!volunteerSummary){
        return null;
    }
    return (
        <>
            {showUploadModal && <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{intl.formatMessage({id : "project.upload.common.uploadFiles"})}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                    <Success message={success} onClose={() => {
                        setSuccess(null);
                        setShowUploadModal(false);
                    }} />
                    <Form>
                        <Form.Group controlId="dni" className="mb-2">
                            <Form.Label>
                                <FormattedMessage id="project.global.fields.dni"/>
                            </Form.Label>
                            <Form.Control type="file" accept=".pdf" ref={dniInputRef}/>
                        </Form.Group>
                        <Form.Group controlId="harassmentCert" className="mb-2">
                            <Form.Label>
                                <FormattedMessage id="project.global.fields.cert.harassmentCert"/>
                            </Form.Label>
                            <Form.Control type="file" accept=".pdf" ref={harassmentCertInputRef}/>
                        </Form.Group>
                        <Form.Group controlId="photo" className="mb-2">
                            <Form.Label>
                                <FormattedMessage id="project.global.fields.photo"/>
                            </Form.Label>
                            <Form.Control type="file" accept="image/*" ref={photoInputRef}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="btn btn-primary" onClick={handleUpload}>
                        {intl.formatMessage({id: 'project.global.buttons.save'})}
                    </Button>
                    <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
                        {intl.formatMessage({id: 'project.global.buttons.close'})}
                    </Button>
                </Modal.Footer>
            </Modal>
            }
            <Card style={{ width: '32rem', margin: 'auto', marginTop: '20px' }}>
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
                        <ListGroup.Item className="d-flex justify-content-between">
                            <div>
                                <strong>{intl.formatMessage({ id: "project.global.fields.phone" })}</strong>
                                <br />
                                {volunteerSummary.phone}
                            </div>
                            {volunteerSummary.email && (
                                <Button
                                    variant="success"
                                    size="sm"
                                    href={`mailto:${volunteerSummary.email}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#28a745',
                                        marginLeft: '10px'
                                    }}
                                >
                                    <FaEnvelope style={{ marginRight: '5px', fontSize: '28px' }} />
                                    <span style={{ marginLeft: '5px' }}>{intl.formatMessage({ id: "project.actions.sendEmail" })}</span>
                                </Button>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>

                <Card.Footer className="text-muted d-flex justify-content-between">
                    {volunteerSummary.hasCertFile && !onlyUpload ?
                        <Button variant="primary" size="sm" style={{marginRight: '10px'}} className="mainButton" onClick={() => handleDownload("AGREEMENT_FILE_SIGNED_BY_BOTH")}>
                        {intl.formatMessage({id: "project.upload.downloadSignedCertByEntity"})}</Button>
                    : <Button variant="primary" size="sm" style={{marginRight: '10px'}} className="mainButton">
                            {intl.formatMessage({id: "project.upload.new.uploadSignedCert"})}</Button>}

                    {volunteerSummary.hasDniFile && !onlyUpload ?
                        <Button variant="primary" size="sm" style={{marginRight: '10px'}} className="mainButton" onClick={() => handleDownload("DNI")}>
                            {intl.formatMessage({id: "project.upload.downloadDNI"})}</Button>
                        : <Button variant="primary" size="sm" style={{marginRight: '10px'}} className="mainButton" onClick={handleUploadDni}>
                            {intl.formatMessage({id: "project.upload.uploadDNI"})}</Button>
                    }
                    {volunteerSummary.hasHarassmentFile && !onlyUpload ?
                                <Button variant="primary" size="sm" style={{ marginRight: '10px' }} className="mainButton" onClick={() => handleDownload("HARASSMENT_CERT")}>
                                    {intl.formatMessage({ id: "project.upload.downloadHarassmentFile" })}
                                </Button>
                                :
                                <Button variant="primary" size="sm" style={{ marginRight: '10px' }} className="mainButton" onClick={handleUploadDni}>
                                    {intl.formatMessage({ id: "project.upload.uploadHarassmentFile" })}
                                </Button>
                    }
                    {volunteerSummary.hasPhotoFile && !onlyUpload ?
                        <Button variant="primary" size="sm" style={{marginRight: '10px'}} className="mainButton" onClick={() => handleDownload("PHOTO")}>
                            {intl.formatMessage({id: "project.upload.downloadPhoto"})}</Button>
                        : <Button variant="primary" size="sm" style={{marginRight: '10px'}} className="mainButton" onClick={handleUploadDni}>
                            {intl.formatMessage({id: "project.upload.uploadPhoto"})}</Button>
                    }
                </Card.Footer>
                {isRepresentative &&
                    <>
                        <Button
                            variant="primary"
                            size="sm"
                            style={{ marginRight: '10px' }}
                            className="mainButton"
                            onClick={handleToggle}
                        >
                            <FaUpload style={{ marginRight: '5px', fontSize: '16px' }} />
                            {intl.formatMessage({ id: "project.upload.uploadFiles" })}
                        </Button>
                    </>}
            </Card>
        </>
    );


}

export default SeeVolunteerSummaryProfile;