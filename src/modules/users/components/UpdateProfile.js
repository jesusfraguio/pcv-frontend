import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Link, useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {Form, FormGroup} from "react-bootstrap";
import {FaPhone} from "react-icons/fa";

const UpdateProfile = () => {

    const user = useSelector(selectors.getUser);
    const isRepresentative = useSelector(selectors.isRepresentative);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(user.name);
    const [lastName, setLastName] = useState(user.surname);
    const [email, setEmail]  = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            
            dispatch(actions.updateProfile(
                {id: user.id,
                name: firstName.trim(),
                surname: lastName.trim(),
                email: email.trim(),
                phone: !phone ? null : phone.trim()
                },
                () => navigate('/'),
                errors => setBackendErrors(errors)));

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card bg-light border-dark">
                <h5 className="card-header">
                    <FormattedMessage id="project.users.UpdateProfile.title"/>
                </h5>
                <div className="card-body">
                    <form ref={node => form = node} 
                        className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                        <FormGroup className="mb-2">
                            <label htmlFor="firstName" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.firstName"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="firstName" className="form-control"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="mb-2">
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
                        </FormGroup>
                        <FormGroup className="mb-2">
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
                        </FormGroup>
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

                        {!isRepresentative &&
                            <FormGroup className="mb-2">
                                <Link to="/users/update-my-doc"><FormattedMessage id ="project.user.doc.title"/></Link>
                            </FormGroup>
                        }

                        <div className="form-group row">
                            <div>
                                <button type="submit" className="mt-2 buttonSecondary btn btn-primary">
                                    <FormattedMessage id="project.global.buttons.save"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default UpdateProfile;
