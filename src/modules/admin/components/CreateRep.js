import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';

import {Errors, Success} from '../../common';
import * as actions from '../actions';
import {Card} from "react-bootstrap";

const CreateRep = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [createdOk, setSuccess] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            dispatch(actions.createRepresentative(
                {email: email.trim(),
                    phone: phone.trim(),
                    name: firstName.trim(),
                    surname: lastName.trim()},
                message => setSuccess(message.message),
                errors => setBackendErrors(errors),
            ));


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
                        <FormattedMessage id="project.admin.CreateRepresentative.title"/>
                    </h5>
                </Card.Header>
                <Card.Body className="px-4 py-3">
                    <form ref={node => form = node}
                          className="needs-validation" noValidate
                          onSubmit={e => handleSubmit(e)}>
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
                            <label htmlFor="firstName" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.firstName"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="firstName" className="form-control"
                                       value={firstName}
                                       onChange={e => setFirstName(e.target.value)}
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="lastName" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.lastName"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="lastName" className="form-control"
                                       value={lastName}
                                       onChange={e => setLastName(e.target.value)}
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
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
                                                required
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
                            <div className="offset-md-3 col-md-2">
                                <button type="submit" className="buttonSecondary btn btn-primary">
                                    <FormattedMessage id="project.global.buttons.register"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );

}

export default CreateRep;