import {FormattedMessage, useIntl} from "react-intl";
import * as actions from '../actions';
import {Errors} from "../../common";
import {Alert, Button, Card, Form, Modal} from "react-bootstrap";
import {FaPhone} from "react-icons/fa";
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import es from 'date-fns/locale/es';
import { localityList } from '../../users/components/LocalityData.js';
import Select from "react-windowed-select";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const CreateVolunteer = () => {

    const intl = useIntl();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [dni, setDni] = useState('');
    const [dniExpiration, setDniExpiration] = useState(null);
    const [locality, setLocality] = useState('');
    const [phone, setPhone] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [createdOk, setSuccess] = useState(null);
    const [dniErrorModal, setDniErrorModal] = useState(false);
    const {locale} = useIntl();
    const [goAnyway,setGoAnyway] = useState(false);
    const submitButtonRef = useRef(null);
    const volunteerIdSuccess = useRef(null);
    let form;

    useEffect(() => {registerLocale('es', es);}, [])

    const handleLocalityChange = (locality) => {
        setLocality(locality);
    };
    const handleDniExpirationChange = (date) => {
        setDniExpiration(date);
    };
    const handleBirthDateChange = (date) => {
        setBirthDate(date);
    };

    const handleClose = () => {
        setDniErrorModal(false);
    };

    const handleContinueAnyway = () => {
        setDniErrorModal(false);
        setGoAnyway(true);
        submitButtonRef.current.click();
    };

    const handleGoBack = () => {
        handleClose();
    };

    function validateDNI(dniNumber) {
        const dniDigitsRegex = /^\d{8}$/;
        const dniRegex = /^(\d{8})([A-HJ-NP-TV-Z])$/i;

        if (dniDigitsRegex.test(dniNumber)) {
            dniNumber = dniNumber + calculateLetter(dniNumber);
        } else if (!dniRegex.test(dniNumber)) {
            return false;
        }

        const dniDigits = dniNumber.substr(0, 8);
        const dniLetter = dniNumber.substr(8, 1).toUpperCase();

        const letterIndex = parseInt(dniDigits, 10) % 23;
        const validLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';

        return dniLetter === validLetters.charAt(letterIndex);
    }

    function calculateLetter(dniDigits) {
        const letterIndex = parseInt(dniDigits, 10) % 23;
        const validLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
        return validLetters.charAt(letterIndex);
    }

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            if(!goAnyway && !validateDNI(dni)){
                setDniErrorModal(true);
                return;
            }
            const cert = document.getElementById('agreementCert');
            const harassmentCert = document.getElementById('harassmentCert');
            const dniDoc = document.getElementById('dniCopy');
            const formData = new FormData();
            formData.set('volunteerDataDto', JSON.stringify({
                name: name.trim(),
                surname: surname.trim(),
                dni: dni.trim(),
                dniExpiration: dniExpiration.toISOString().split("T")[0],
                locality: locality.value,
                phone: phone.trim(),
                birth: birthDate.toISOString().split("T")[0],
                }));

            if(cert.files.length > 0){
                formData.append('cert', cert.files[0], cert.files[0].name);
            }
            if(harassmentCert.files.length > 0){
                formData.append('harassmentCert', harassmentCert.files[0], harassmentCert.files[0].name);
            }
            if(dniDoc.files.length > 0){
                formData.append('dni', dniDoc.files[0], dniDoc.files[0].name);
            }
            actions.createVolunteer(formData,
                id => {
                    volunteerIdSuccess.current = id;
                    setSuccess(intl.formatMessage({id: 'project.created.volunteer.success'}));
                },
                        errors => setBackendErrors(errors)
            );
            setName('');
            setDni('');
            setDniExpiration(null);
            setSurname('');
            setPhone('');
            setLocality(null);
            setBirthDate(null);
            setPhone('');
            setGoAnyway(false);
            if(form.classList.contains('was-validated')) {
                form.classList.remove('was-validated');
            }
            if (harassmentCert) {
                harassmentCert.value = '';
            }

            if (dniDoc) {
                dniDoc.value = '';
            }

            if (cert) {
                cert.value = '';
            }

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }
    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            {createdOk &&
                <Modal show={createdOk!==null} onHide={() => navigate(`/users/${volunteerIdSuccess.current}`)} centered>
                    <Modal.Body closeButton>
                        <Alert variant="success" onClose={() => navigate(`/users/${volunteerIdSuccess.current}`)} dismissible>
                            <p>{createdOk} </p>
                        </Alert>
                    </Modal.Body>
                </Modal>
            }
            <Modal show={dniErrorModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> {intl.formatMessage({ id: 'project.volunteer.dniValidation.error' }, { dni: dni})} </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleGoBack}>
                        <FormattedMessage id="project.global.buttons.goBack" />
                    </Button>
                    <Button variant="danger" className="" onClick={handleContinueAnyway}>
                        <FormattedMessage id="project.common.goAnyway" />
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card className="card-main">
                <Card.Header className="bg-transparent border-0 text-center">
                    <h5>
                        <FormattedMessage id="project.representative.CreateVolunteer.title"/>
                    </h5>
                </Card.Header>
                <Card.Body className="px-4 py-3">
                    <Form ref={node => form = node}
                          className="needs-validation" noValidate
                          onSubmit={e => handleSubmit(e)}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <label htmlFor="name" className="col-md-3 col-form-label">
                                        <FormattedMessage id="project.global.fields.name"/>
                                    </label>
                                    <div>
                                        <input type="text" id="name" className="form-control"
                                               value={name}
                                               onChange={e => setName(e.target.value)}
                                               required/>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 offset-md-3">
                                <div className="form-group mb-2">
                                    <label htmlFor="lastname" className="col-md-3 col-form-label">
                                        <FormattedMessage id="project.global.fields.lastName"/>
                                    </label>
                                    <div>
                                        <input type="text" id="surname" className="form-control"
                                               value={surname}
                                               onChange={e => setSurname(e.target.value)}
                                               required/>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Form.Group className="form-group mb-2">
                            <label htmlFor="dni" className="col-md-2 col-form-label">
                                <FormattedMessage id="project.global.fields.dni.title"/>
                            </label>
                            <div className="col-md-2">
                                <input type="text" id="dni" className="form-control"
                                       value={dni}
                                       onChange={e => setDni(e.target.value)}
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="phone" className="mb-2">
                            <label htmlFor="phone" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.phone"/>
                            </label>
                            <div className="col-md-4">
                                <div className="d-flex align-items-center">
                                    <FaPhone />
                                    <div className="phone-input-container">
                                        <div className="phone-input">
                                            <input
                                                type="text"
                                                name="prefix"
                                                value="+34"
                                                readOnly
                                                minLength="3"
                                            />
                                            <input type="tel" id="phone" className="form-control"
                                                   placeholder="611010101"
                                                   value={phone}
                                                   onChange={e => setPhone(e.target.value)}
                                                   required
                                            />
                                            <div className="invalid-feedback">
                                                <FormattedMessage id='project.global.validator.required'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="locality" className="mb-2">
                            <Form.Label><FormattedMessage id='project.global.fields.locality'/></Form.Label>
                            <div className="col-md-4">
                            <Select
                                options={localityList}
                                value={locality}
                                onChange={handleLocalityChange}
                                placeholder={intl.formatMessage({id : "project.choose.locality"})}
                                isClearable={true}
                                isSearchable={true}
                                maxMenuHeight={300}
                                menuPlacement="auto"
                                windowThreshold={50}
                                initialListSize={15} // only render 15 items initially
                                pageSize={15}
                                required
                            />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="birthDate" className="mb-2">
                            <Form.Label><FormattedMessage id='project.global.fields.birthDate'/></Form.Label>
                            <div className="col-md-4">
                            <DatePicker
                                dateFormat="dd-MM-yyyy"
                                openToDate={new Date(new Date().getFullYear()-50, 0, 1)}
                                locale={locale}
                                selected={birthDate}
                                onChange={handleBirthDateChange}
                                className="form-control"
                                maxDate={new Date(new Date().getTime()-504576000000)}
                                showYearDropdown
                                scrollableMonthYearDropdown
                                yearDropdownItemNumber={10}
                                required
                            />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="dniExpiration" className="mb-2">
                            <Form.Label><FormattedMessage id='project.global.fields.dniExpiration'/></Form.Label>
                            <div className="col-md-4">
                            <DatePicker
                                dateFormat="dd-MM-yyyy"
                                locale={locale}
                                selected={dniExpiration}
                                onChange={handleDniExpirationChange}
                                minDate={new Date()} // no allow outdated dni
                                className="form-control"
                                showYearDropdown
                                scrollableMonthYearDropdown
                                yearDropdownItemNumber={10}
                                required
                            />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="agreementCert" className="mb-2">
                            <Form.Label>
                                <FormattedMessage id="project.global.fields.agreement.file.signedByBoth"/>
                            </Form.Label>
                            <Form.Control type="file" accept=".pdf" required />
                        </Form.Group>

                        <Form.Group controlId="dniCopy" className="mb-2">
                            <Form.Label>
                                <FormattedMessage id="project.global.fields.dni"/>
                            </Form.Label>
                            <Form.Text className="ms-5" muted>
                                <FormattedMessage id="project.common.optional"/>
                            </Form.Text>
                            <Form.Control type="file" accept=".pdf" />
                        </Form.Group>
                        <Form.Group controlId="harassmentCert" className="mb-4">
                            <Form.Label>
                                <FormattedMessage id="project.global.fields.cert.harassmentCert"/>
                            </Form.Label>
                            <Form.Text className="ms-5" muted>
                                <FormattedMessage id="project.common.optional"/>
                            </Form.Text>
                            <Form.Control type="file" accept=".pdf" />
                        </Form.Group>
                        <div className="form-group row mb-2">
                            <div className="offset-md-1 col-md-2">
                                <button type="submit" ref ={submitButtonRef} className="buttonSecondary btn btn-primary">
                                    <FormattedMessage id="project.global.buttons.create.Volunteer"/>
                                </button>
                            </div>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );

}

export default CreateVolunteer;