import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";

const NotLoggedUserShowLogin = () => {

    const intl = useIntl();
    const navigate = useNavigate();

    return (
        <div>
            <div className="page-wrapper">
                <div className="image-wrapper">
                    <div className="default-main-section">
                        <div className="background-secondary-image"></div>
                        <Container>
                            <Row>
                                <Col md={6}>
                                    <div className="join-text">
                                        {intl.formatMessage({id : 'project.app.Home.joinCommunity'})}
                                    </div>
                                    <div className="button-group">
                                        <Button className="buttonSecondary mx-2">
                                            {intl.formatMessage({id : 'project.app.Home.IAmEntity'})}
                                        </Button>
                                        <Button variant="primary" className="buttonSecondary mx-2" onClick={() => navigate('/users/signup')}>
                                            {intl.formatMessage({id : 'project.app.Home.IWantBeVolunteer'})}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotLoggedUserShowLogin;