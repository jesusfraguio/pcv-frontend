import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';

import {Errors} from '../../common';
import * as actions from '../actions';
import {Card} from "react-bootstrap";
import Select from "react-windowed-select";
import { useIntl } from 'react-intl';
import { localityList } from './LocalityData.js';

const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();
    const [locality, setLocality] = useState(null);
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('2');
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail]  = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
    let form;
    let confirmPasswordInput;

    const months = [
        { value: "01", label: intl.formatMessage({ id: 'project.month.January' })},
        { value: "02", label: intl.formatMessage({ id: 'project.month.February' })},
        { value: "03", label: intl.formatMessage({ id: 'project.month.March' })},
        { value: "04", label: intl.formatMessage({ id: 'project.month.April' })},
        { value: "05", label: intl.formatMessage({ id: 'project.month.May' })},
        { value: "06", label: intl.formatMessage({ id: 'project.month.June' })},
        { value: "07", label: intl.formatMessage({ id: 'project.month.July' })},
        { value: "08", label: intl.formatMessage({ id: 'project.month.August' })},
        { value: "09", label: intl.formatMessage({ id: 'project.month.September' })},
        { value: "10", label: intl.formatMessage({ id: 'project.month.October' })},
        { value: "11", label: intl.formatMessage({ id: 'project.month.November' })},
        { value: "12", label: intl.formatMessage({ id: 'project.month.December' })}
    ];

    const days = [];
    for (let i = 1; i <= 31; i++) {
        if(i<10){
            days.push({ value: "0"+i.toString(), label: i.toString() });
        }
        else{
            days.push({ value: i.toString(), label: i.toString() });
        }
    }

    const years = [];
    for (let i = new Date().getFullYear() - 16; i >= 1903; i--) {
        years.push({ value: i.toString(), label: i.toString() });
    }
    const handleChange = (locality) => {
        setLocality(locality);
    };

    const handleSubmit = event => {

        event.preventDefault();

        if (checkBirthdayDate() && form.checkValidity() && checkConfirmPassword()) {
            dispatch(actions.signUp(
                {phone: phone.trim(),
                password: password,
                name: firstName.trim(),
                surname: lastName.trim(),
                email: email.trim(),
                birth: (year.value+"-"+month.value+"-"+day.value).trim(),
                locality: locality.value},
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

    const checkConfirmPassword = () => {

        if (password !== confirmPassword) {

            confirmPasswordInput.setCustomValidity('error');
            setPasswordsDoNotMatch(true);

            return false;

        } else {
            return true;
        }

    }

    const checkBirthdayDate = () => {

        if (!day || !month || !year) {

            setBirthDate('');
            return false;

        } else {
            return true;
        }

    }

    const handleConfirmPasswordChange = value => {

        confirmPasswordInput.setCustomValidity('');
        setConfirmPassword(value);
        setPasswordsDoNotMatch(false);
    
    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <Card className="card-main">
                    <Card.Header className="bg-transparent border-0 text-center">
                        <h5>
                            <FormattedMessage id="project.users.SignUp.title"/>
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
                            <label htmlFor="password" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.password"/>
                            </label>
                            <div className="col-md-4">
                                <input type="password" id="password" className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2" >
                            <label htmlFor="confirmPassword" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.users.SignUp.fields.confirmPassword"/>
                            </label>
                            <div className="col-md-4">
                                <input ref={node => confirmPasswordInput = node}
                                    type="password" id="confirmPassword" className="form-control"
                                    value={confirmPassword}
                                    onChange={e => handleConfirmPasswordChange(e.target.value)}
                                    required/>
                                <div className="invalid-feedback">
                                    {passwordsDoNotMatch ?
                                        <FormattedMessage id='project.global.validator.passwordsDoNotMatch'/> :
                                        <FormattedMessage id='project.global.validator.required'/>}
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
                                           required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                            </div>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="firstName" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.birthDate"/>
                            </label>
                            <div className="col-md-4">
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <Select options={months} value={month} onChange={(selectedOption) => setMonth(selectedOption)} windowThreshold={12} initialListSize={12}
                                        pageSize={12} placeholder="Mes" className={birthDate ? "" : "is-invalid"} styles={{control: (provided) => ({
                                    ...provided,
                                    minWidth: 150 // minWidth 150px para que se vea el mes en 1 linea en cualquier dispositivo
                                })}} />
                                <Select options={days} value={day} onChange={(e) => setDay(e)} placeholder="Día"  windowThreshold={31}
                                        className={birthDate ? "" : "is-invalid"}/>
                                <Select options={years} value={year} onChange={(e) => setYear(e)} placeholder="Año" windowThreshold={30}
                                        className={birthDate ? "" : "is-invalid"}/>
                                {!birthDate && (
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                )}
                            </div>
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <label htmlFor="firstName" className="col-md-3 col-form-label">
                                <FormattedMessage id="project.global.fields.locality"/>
                            </label>
                            <div className="col-md-4">
                                <Select
                                    options={localityList}
                                    value={locality}
                                    onChange={handleChange}
                                    placeholder={intl.formatMessage({id : "project.choose.locality"})}
                                    isClearable={true}
                                    isSearchable={true}
                                    maxMenuHeight={300}
                                    menuPlacement="auto"
                                    windowThreshold={50}
                                    initialListSize={15} // only render 15 items initially
                                    pageSize={15}
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-2">
                            <div className="offset-md-3 col-md-2">
                                <button type="submit" className="btn btn-primary buttonSecondary">
                                    <FormattedMessage id="project.users.SignUp.title"/>
                                </button>
                            </div>
                        </div>
                    </form>
                    </Card.Body>
            </Card>
        </div>
    );

}

export default SignUp;
