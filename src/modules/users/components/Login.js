import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import {Card, Nav} from "react-bootstrap";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {

            dispatch(actions.login(
                userName.trim(),
                password,
                () => navigate('/'),
                errors => setBackendErrors(errors),
                () => {
                    navigate('/users/login');
                    dispatch(actions.logout());
                }
            ));

        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }

    }

    return (
        <div id="sign-in-wrapper">
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <Card className="card-main">
                <Card.Header className="bg-transparent border-0 text-center">
                    <h5>
                        <FormattedMessage id="project.users.Login.title"/>
                    </h5>
                </Card.Header>
                <Card.Body className="px-4 py-3">
                    <form ref={node => form = node} 
                        className="needs-validation" noValidate 
                        onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="userName" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.email"/>
                            </label>
                            <div className="col-md-5 col-form-label text center">
                                <input type="email" id="userName" className="form-control"
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.email'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.password"/>
                            </label>
                            <div className="col-md-5 col-form-label text center">
                                <input type="password" id="password" className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-md-3 col-md-1">
                                <button type="submit" className="buttonSecondary btn btn-primary">
                                    <FormattedMessage id="project.users.Login.title"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </Card.Body>
            </Card>
            <div className="mt-4">
                <p className="text-center">
                    <Link to="/users/forgotPassword">
                        <FormattedMessage id="project.users.forgotPassword.title"/>
                    </Link>
                </p>

                <p className="text-center">
                        <FormattedMessage id="project.users.noAccount.title"/>
                </p>
            <p className="text-center">
                <Nav.Link href="/users/signup" style={{ backgroundColor: '#A0A0A0', color: '#fff', padding: '6px 12px', borderRadius: '6px', display: 'inline-block'}}>
                    <FormattedMessage id="project.users.SignUp.title"/>
                </Nav.Link>
            </p>
            </div>
        </div>
    );

}

export default Login;
