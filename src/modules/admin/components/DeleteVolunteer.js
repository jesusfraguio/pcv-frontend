import {useDispatch} from "react-redux";
import {FormattedMessage, useIntl} from "react-intl";
import {useState} from "react";
import * as actions from '../actions';
import {Errors, Success} from "../../common";
import {Alert, Card, Modal} from "react-bootstrap";

const DeleteVolunteer = () => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const [backendErrors, setBackendErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [dni, setDni] = useState('');
    let form;

    const handleSubmit = event => {
        event.preventDefault();
        if(form.checkValidity()){
            dispatch(actions.deleteVolunteer(dni, success => {
                setSuccess(success);
                setDni('');
            }, errors => setBackendErrors(errors)));
        }
        else{
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    }
    return(
        <>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            {success && <Success message={intl.formatMessage({id: "project.deleted.user.success"})}
                     onClose={() => setSuccess(null)}/> }
            {success===false &&
                <Modal show={success===false} onHide={() => setSuccess(null)} centered>
                    <Modal.Body closeButton>
                        <Alert variant="danger" onClose={() => setSuccess(null)} dismissible>
                            <h4> {intl.formatMessage({id: "project.deleted.user.alreadyDeleted"})} </h4>
                        </Alert>
                    </Modal.Body>
                </Modal>
            }
            <Card className="card-main">
                <Card.Header className="bg-transparent border-0 text-center">
                    <h5>
                        <FormattedMessage id="project.global.buttons.delete.user"/>
                    </h5>
                </Card.Header>
                <Card.Body className="px-4 py-3">
                    <form ref={node => form = node}
                          className="needs-validation" noValidate
                          onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row mb-2">
                            <label htmlFor="dni" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.dni.title"/>
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="dni" className="form-control"
                                       value={dni}
                                       onChange={e => setDni(e.target.value)}
                                       required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <div className="offset-md-3 col-md-2">
                                <button type="submit" className="buttonSecondary btn btn-primary">
                                    <FormattedMessage id="project.global.buttons.delete.user"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </>
    );
}

export default DeleteVolunteer;