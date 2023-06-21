import {useIntl} from "react-intl";
//import {useDispatch} from "react-redux";
//import * as action from "../actions";
import {Col, Dropdown, Row} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";
import {useState} from "react";
import {Errors, Success} from "../../common";

const AvailableVolunteers = ({ volunteers, setOrderBy, setOrderType, orderBy, orderType}) => {

    const intl = useIntl();

    //const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [success,setSuccess] = useState(null);
    const [failure,setFailure] = useState(null);

    const getOrderTypeDisplay = (orderType) => {
        switch(orderType) {
            case 'asc':
                return intl.formatMessage({id : 'project.global.sort.asc'});
            case 'desc':
                return intl.formatMessage({id : 'project.global.sort.desc'});
            default:
                return intl.formatMessage({id : 'project.global.sort.asc'});
        }
    };
    const getOrderByDisplay = (orderBy) => {
        switch(orderBy) {
            case 'volunteerPhone':
                return intl.formatMessage({id : 'project.global.fields.phone'});
            case 'volunteerName':
                return intl.formatMessage({id : 'project.global.fields.firstName'});
            case 'volunteerSurname':
                return intl.formatMessage({id : 'project.global.fields.lastName'});
            default:
                return intl.formatMessage({id : 'project.global.sort.orderBy'});
        }
    };

    return (
        <div>
            <Errors errors={failure} onClose={() => setFailure(null)}/>
            <Row style={{ justifyContent: 'flex-end' }}>
                <Col xs="auto">
                    <Dropdown onSelect={(key) => setOrderBy(key)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {getOrderByDisplay(orderBy)}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="volunteerPhone">{intl.formatMessage({id : 'project.global.state.title'})}</Dropdown.Item>
                            <Dropdown.Item eventKey="volunteerName">{intl.formatMessage({id : 'project.global.fields.firstName'})}</Dropdown.Item>
                            <Dropdown.Item eventKey="volunteerSurname">{intl.formatMessage({id : 'project.global.fields.lastName'})}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                {orderBy != null && <Col xs="auto">
                    <Dropdown onSelect={(key) => setOrderType(key)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {getOrderTypeDisplay(orderType)}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="asc">{intl.formatMessage({id: 'project.global.sort.asc'})}</Dropdown.Item>
                            <Dropdown.Item eventKey="desc">{intl.formatMessage({id: 'project.global.sort.desc'})}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col> }
            </Row>
            {
                showModal &&
                <Success message = {success}  onClose= {() => { setSuccess(''); setShowModal(false); }}/>
            }
            <Table>
                <thead>
                <tr>
                    <th>{intl.formatMessage({id : 'project.global.fields.name'})}</th>
                    <th>{intl.formatMessage({id : 'project.global.fields.lastName'})}</th>
                </tr>
                </thead>
                <tbody>
                {volunteers.map((volunteer, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={`/users/${volunteer.volunteerId}`} className="name-link">
                                {volunteer.name}
                            </Link>
                        </td>
                        <td>{volunteer.surname}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AvailableVolunteers;