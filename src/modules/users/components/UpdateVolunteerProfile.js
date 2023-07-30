import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import * as actions from "../actions";
import {Card, Form} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import {FaPhone} from "react-icons/fa";
import Select from "react-windowed-select";
import {localityList} from "./LocalityData";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import DatePicker, {registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es';
import {Errors, Success} from "../../common";

const UpdateVolunteerProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const intl = useIntl();
    const [volunteerProfile, setVolunteerProfile] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    const [success, setSuccess] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail]  = useState('');
    const [dni, setDni] = useState('');
    const [dniExpiration, setDniExpiration] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [locality, setLocality] = useState('');
    const [phone, setPhone] = useState('');
    let form;
    const {locale} = useIntl();

    useEffect(() => {registerLocale('es', es);}, []);

    useEffect(() => {
        dispatch(actions.seeVolunteerFullProfile(id, profile => setVolunteerProfile(profile), errors => setBackendErrors(errors)));
    },
        //eslint-disable-next-line react-hooks/exhaustive-deps
        []);
    useEffect(() => {
        if(volunteerProfile){
            setFirstName(volunteerProfile.name);
            setLastName(volunteerProfile.surname);
            setEmail(volunteerProfile.email);
            setDni(volunteerProfile.dni);
            const [year, month, day] = volunteerProfile.dniExpiration;
            setDniExpiration(new Date(year,month-1,day));
            setLocality(localityList.find((item) => item.value === volunteerProfile.locality));
            setPhone(volunteerProfile.phone);
            const [year1, month1, day1] = volunteerProfile.birth;
            setBirthDate(new Date(year1,month1-1,day1));
        }
    }, [volunteerProfile]);

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            dispatch(actions.updateMyVolunteer(id, {
                id: id,
                name: firstName.trim(),
                surname: lastName.trim(),
                email: !email ? null : email.trim(),
                dni: dni.trim(),
                dniExpiration: new Date(dniExpiration.getTime()+ 86400000).toISOString().split("T")[0],
                locality: locality.value,
                phone: phone.trim(),
                birth: new Date(birthDate.getTime()+ 86400000).toISOString().split("T")[0]}, updatedProfile => {
                setSuccess(true);
                setVolunteerProfile(updatedProfile);
                },
                    errors => setBackendErrors(errors)));
        }
    };

    const handleLocalityChange = (locality) => {
        setLocality(locality);
    };
    const handleDniExpirationChange = (date) => {
        setDniExpiration(date);
    };
    const handleBirthDateChange = (date) => {
        setBirthDate(date);
    };

    return (
        <div>
            {success && <Success onClose={() => setSuccess(false)} message={intl.formatMessage({id:"project.global.message.ok"})} /> }
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null) } />
            <Card className="card-main">
                <Card.Header className="bg-transparent border-0 text-center">
                    <h5>
                        <FormattedMessage id="project.representative.UpdateVolunteer.title"/>
                    </h5>
                </Card.Header>
                <Card.Body className="px-4 py-3">
                    <Form ref={node => form = node}
                          className="needs-validation" noValidate
                          onSubmit={e => handleSubmit(e)}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <label htmlFor="name" className="col-md-4 col-form-label">
                                        <FormattedMessage id="project.global.fields.name"/>
                                    </label>
                                    <div>
                                        <input type="text" id="name" className="form-control"
                                               value={firstName}
                                               onChange={e => setFirstName(e.target.value)}
                                               required/>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 offset-md-3">
                                <div className="form-group mb-2">
                                    <label htmlFor="lastname" className="col-md-6 col-form-label">
                                        <FormattedMessage id="project.global.fields.lastName"/>
                                    </label>
                                    <div>
                                        <input type="text" id="surname" className="form-control"
                                               value={lastName}
                                               onChange={e => setLastName(e.target.value)}
                                               required/>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <Form.Group className="form-group mb-2">
                                    <label htmlFor="dni" className="col-md-3 col-form-label">
                                        <FormattedMessage id="project.global.fields.dni.title"/>
                                    </label>
                                    <div className="col-md-6">
                                        <input type="text" id="dni" className="form-control"
                                               value={dni}
                                               onChange={e => setDni(e.target.value)}
                                               required/>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="col-md-4 offset-md-3">
                                <div className="form-group mb-2">
                                    <label htmlFor="email" className="col-md-9 col-form-label">
                                        <FormattedMessage id="project.global.fields.email"/>
                                    </label>
                                    <div>
                                        {!email ? <input type="text" id="email" className="form-control"
                                                         value={email}
                                                         onChange={e => setEmail(e.target.value)}
                                            />
                                            : <input type="text" id="email" className="form-control"
                                                     value={email}
                                                     onChange={e => setEmail(e.target.value)}
                                                     required/>
                                        }
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        <div className="form-group row mb-2">
                            <div className="offset-md-1 col-md-2">
                                <button type="submit" className="buttonSecondary btn btn-primary">
                                    <FormattedMessage id="project.global.buttons.update.Volunteer"/>
                                </button>
                            </div>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}
export default UpdateVolunteerProfile;