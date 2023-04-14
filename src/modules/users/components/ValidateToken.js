import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import * as actions from '../actions';
import {Errors} from "../../common";
import {FormattedMessage} from "react-intl";
import {useState} from "react";
import {setServiceToken} from "../../../backend/appFetch";
import {Card} from "react-bootstrap";

const ValidateToken = () => {
    const { registerToken } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
    let form;
    let confirmNewPasswordInput;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity() && checkConfirmNewPassword()) {
            if(registerToken!=null){
                setServiceToken(registerToken);
            }
            dispatch(actions.createPassword(newPassword,
                () => navigate('/'),
                errors => setBackendErrors(errors),
                    () => {
                        navigate('/users/login');
                        dispatch(actions.logout());
                    }),
                );

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    const checkConfirmNewPassword = () => {

        if (newPassword !== confirmNewPassword) {

            confirmNewPasswordInput.setCustomValidity('error');
            setPasswordsDoNotMatch(true);

            return false;

        } else {
            return true;
        }

    }

    const handleConfirmNewPasswordChange = event => {

        confirmNewPasswordInput.setCustomValidity('');
        setConfirmNewPassword(event.target.value);
        setPasswordsDoNotMatch(false);

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <Card className="card-main">
                <Card.Header className="bg-transparent border-0 text-center">
                    <h5>
                        <FormattedMessage id="project.users.ChangePassword.title"/>
                    </h5>
                </Card.Header>
                <Card.Body className="px-4 py-3">
                    <form ref={node => form = node}
                          className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row mb-2">
                            <label htmlFor="newPassword" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.users.ChangePassword.fields.newPassword"/>
                            </label>
                            <div className="col-md-4">
                                <input type="password" id="newPassword" className="form-control"
                                       value={newPassword}
                                       onChange={e => setNewPassword(e.target.value)}
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="confirmNewPassword" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.users.ChangePassword.fields.confirmNewPassword"/>
                            </label>
                            <div className="col-md-4">
                                <input ref={node => confirmNewPasswordInput = node}
                                       type="password" id="confirmNewPassword" className="form-control"
                                       value={confirmNewPassword}
                                       onChange={e => handleConfirmNewPasswordChange(e)}
                                       required/>
                                <div className="invalid-feedback">
                                    {passwordsDoNotMatch ?
                                        <FormattedMessage id='project.global.validator.passwordsDoNotMatch'/> :
                                        <FormattedMessage id='project.global.validator.required'/>}

                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <div className="offset-md-3 col-md-1">
                                <button type="submit" className="btn btn-primary">
                                    <FormattedMessage id="project.global.buttons.save"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ValidateToken;