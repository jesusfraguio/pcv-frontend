import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';

import {Errors, Success} from '../../common';
import * as actions from '../actions';
import {Card} from "react-bootstrap";
import { useIntl } from 'react-intl';

const CreateEntity = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [address,setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [createdOk, setSuccess] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            const photoInput = document.getElementById('fileLogo');
            const cert = document.getElementById('agreementCert');
            const formData = new FormData();
            formData.set('entityDto', JSON.stringify({
                email: email.trim(),
                phone: phone.trim(),
                name: name.trim(),
                url: url!=='' ? url.trim() : null,
                address: address.trim(),
                shortDescription: shortDescription.trim()}));
            //This allows to send optional files so you can add them later
            //if(photoInput.files.length > 0){
                formData.append('logo', photoInput.files[0], photoInput.files[0].name);
            //}
            //if(cert.files.length > 0){
                formData.append('cert', cert.files[0], cert.files[0].name);
            //}
            dispatch(actions.createEntity(formData,
                message => setSuccess(intl.formatMessage({ id: 'project.created.entity.success' }, { name: message.name})),
                errors => setBackendErrors(errors),
            ));

            setEmail('');
            setName('');
            setUrl('');
            setShortDescription('');
            setAddress('');
            setPhone('');
            if(form.classList.contains('was-validated')) {
                form.classList.remove('was-validated');
            }
            if (photoInput) {
                photoInput.value = '';
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
            <Success message={createdOk}
                     onClose={() => setSuccess(null)}/>
            <Card className="card-main">
                <Card.Header className="bg-transparent border-0 text-center">
                    <h5>
                        <FormattedMessage id="project.admin.CreateEntity.title"/>
                    </h5>
                </Card.Header>
                <Card.Body className="px-4 py-3">
                    <form ref={node => form = node}
                          className="needs-validation" noValidate
                          onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row mb-2">
                            <label htmlFor="name" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.name"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="name" className="form-control"
                                       value={name}
                                       onChange={e => setName(e.target.value)}
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="shortDescription" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.shortDescription"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="shortDescription" className="form-control"
                                       value={shortDescription}
                                       onChange={e => setShortDescription(e.target.value)}
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="url" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.url"/>
                            </label>
                            <div className="col-md-4">
                                <input type="url" id="url" className="form-control"
                                       value={url}
                                       onChange={e => setUrl(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-2">
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
                                                //required no es obligatorio(?)
                                            />
                                            <div className="invalid-feedback">
                                                <FormattedMessage id='project.global.validator.required'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="email" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.email"/>
                            </label>
                            <div className="col-md-4">
                                <input type="email" id="email" className="form-control"
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.email'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="address" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.address"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="address" className="form-control"
                                       value={address}
                                       onChange={e => setAddress(e.target.value)}
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="fileLogo" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.photo"/>
                            </label>
                            <div className="col-md-4">
                                <input type="file" id="fileLogo" name="fileLogo" accept="image/*" required/>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="agreementCert" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.agreement.file"/>
                            </label>
                            <div className="col-md-4">
                                <input type="file" id="agreementCert" name="agreementCert" accept=".pdf" required/>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <div className="offset-md-3 col-md-2">
                                <button type="submit" className="buttonSecondary btn btn-primary">
                                    <FormattedMessage id="project.global.buttons.create.Entity"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );

}

export default CreateEntity;