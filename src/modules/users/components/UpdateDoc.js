import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage, useIntl} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import {Alert, Card, Form, Modal} from "react-bootstrap";
import users from "../index";
import {FaInfoCircle} from "react-icons/fa";
import * as actions from '../actions';
import {Errors} from "../../common";

const UpdateDoc = () => {
    const [isAgreementChecked, setIsAgreementChecked] = useState(false);
    const containerRef = useRef(null);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [showPopover, setShowPopover] = useState(false);
    const user = useSelector(users.selectors.getUser);
    const dispatch = useDispatch();
    const intl = useIntl();
    const navigate = useNavigate();
    const [success,setSuccess] = useState(false);
    const [errors,setErrors] = useState('');

    let form;

    const link = <a href={intl.formatMessage({id: 'project.global.cert.harassmentCert.link'})}>{intl.formatMessage({id: 'project.global.cert.harassmentCert.link'})}</a>;
    const handleCheckboxChange = (event) => {
        setIsAgreementChecked(event.target.checked);
        if (event.target.checked) {
            setShowModal(false);
        }
    };

    const handleScroll = () => {
        const container = containerRef.current;

        if (container) {
            const isScrollbarAtBottom = container.scrollHeight - container.scrollTop<container.clientHeight+1;

            setIsScrolledToBottom(isScrollbarAtBottom);
        }
    };

    const handleModalShow = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        if(isAgreementChecked) {
            setShowModal(false);
        }
    };

    const handleClose = () => {
        navigate('/');
    };

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            const dniInput = document.getElementById('dni');
            const cert = document.getElementById('harassmentCert');
            const formData = new FormData();
            if(dniInput.files.length > 0){
                formData.append('dni', dniInput.files[0], dniInput.files[0].name);
            }
            if(cert.files.length > 0){
                formData.append('harassmentCert', cert.files[0], cert.files[0].name);
            }
            dispatch(actions.updateMyDoc(formData,user.id,
                message => setSuccess(true),
                errors => setErrors(errors),
            ));
        }
    }

    return (
        <div>
            <Card className="card-main">
                <Card.Header className="bg-transparent border-0 text-center">
                    <h5>
                        <FormattedMessage id="project.user.doc.title"/>
                    </h5>
                </Card.Header>
                <Card.Body className="px-4 py-3">
                    {success &&
                        <Modal show={success} onHide={handleClose} centered>
                            <Modal.Body closeButton>
                                <Alert variant="success" onClose={handleClose} dismissible>
                                    <FormattedMessage id="project.global.message.ok" />
                                </Alert>
                            </Modal.Body>
                        </Modal>
                    }
                    {errors && <Modal show={!(!errors)} onHide={handleClose} centered>
                        <Modal.Body closeButton>
                            <Errors onClose={handleClose} message={errors} />
                        </Modal.Body>
                    </Modal>}
                    <Modal show={showModal} onHide={() => handleModalClose()} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.formatMessage({id:'project.global.agreement'})}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: '18px' }}>
                            <div style={{ height: '300px', overflowY: 'scroll' }}  onScroll={handleScroll} ref={containerRef}>
                                <p>{intl.formatMessage({ id: 'project.law.agreement' })}</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <label htmlFor="agreementCheckbox">
                                <input
                                    type="checkbox"
                                    id="agreementCheckbox"
                                    checked={isAgreementChecked}
                                    onChange={handleCheckboxChange}
                                    disabled={!isScrolledToBottom}
                                />
                                {intl.formatMessage({ id: 'project.law.verifyAgreement' }, {name: user.email})}
                            </label>
                        </Modal.Footer>
                    </Modal>
                    {isAgreementChecked && <Form.Group className="row mb-2">
                        <label htmlFor="agreementCheckbox">
                        <input
                            type="checkbox"
                            id="agreementCheckbox"
                            checked={isAgreementChecked}
                            onChange={handleModalShow}
                            disabled={!isScrolledToBottom}
                        />
                        {intl.formatMessage({ id: 'project.law.verifyAgreement' }, { name: user.email })}
                    </label>
                    </Form.Group>
                    }
                    <Form ref={node => form = node}
                          className="needs-validation" noValidate
                          onSubmit={e => handleSubmit(e)}>
                        <Form.Group controlId="dni" className="mb-2">
                            <Form.Label>
                                <FormattedMessage id="project.global.fields.dni"/>
                            </Form.Label>
                            <Form.Control type="file" accept=".pdf" />
                        </Form.Group>

                        <Form.Group controlId="harassmentCert" className="mb-2">
                            {showPopover && (
                                <Alert key="secondary" variant="secondary">
                                    <FormattedMessage
                                        id="project.global.why.cert.harassmentCert"
                                        values={{ link }}
                                    />
                                </Alert>
                            )}
                            <Form.Label className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.cert.harassmentCert" />
                                <FaInfoCircle
                                    className="ml-2"
                                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                                    onClick={togglePopover}
                                />
                            </Form.Label>
                            <div className="col-md-4">
                                <Form.Control type="file" accept=".pdf" />
                            </div>
                        </Form.Group>

                        <Form.Group className="row mb-2">
                            <div className="col-md-2">
                                <button type="submit" className="buttonSecondary btn btn-primary">
                                    <FormattedMessage id="project.user.doc.title" />
                                </button>
                            </div>
                        </Form.Group>
                    </Form>
            </Card.Body>
        </Card>
    </div>
    );
}

export default UpdateDoc;