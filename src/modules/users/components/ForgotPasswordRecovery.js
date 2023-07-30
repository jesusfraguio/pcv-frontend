import {FormattedMessage} from "react-intl";
import {useState} from "react";
import * as actions from '../actions';
import {useDispatch} from "react-redux";

const ForgotPasswordRecovery = () => {
    const [email, setEmail] = useState('');
    const [sentEmail, setSentEmail] = useState(false);
    const dispatch = useDispatch();

    const handleRecover = () =>
    {
        dispatch(actions.recoverPassword({email: email.trim()}));
        setSentEmail(true);
    }
    return(
        <div>
            {sentEmail && <div>
                <div className="mb-4"/>
                <div className="alert alert-info" role="alert">
                    <FormattedMessage id='project.app.emailWillBeSent'/>
                </div>
            </div>
            }
            <div className="form-group row">
                <label htmlFor="userName" className="col-md-3 col-form-label">
                    <FormattedMessage id="project.global.fields.email"/>
                </label>
                <div className="col-md-5 col-form-label text center">
                    <input type="email" id="email" className="form-control"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                           autoFocus
                           required/>
                    <div className="invalid-feedback">
                        <FormattedMessage id='project.global.validator.email'/>
                    </div>
                </div>
            </div>
            <div className="form-group row mb-2">
                <div className="offset-md-3 col-md-2">
                    <button type="submit" className="btn btn-primary buttonSecondary" onClick={() => handleRecover()}>
                        <FormattedMessage id="project.app.restorePassword.title"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordRecovery;