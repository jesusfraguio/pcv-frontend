import React from 'react';
import {Container, Row, Col, Button, Carousel} from 'react-bootstrap';
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";

const NotLoggedUserShowLogin = () => {

    const intl = useIntl();
    const navigate = useNavigate();

    return (
        <div>
            <div className="page-wrapper">
                <Carousel className="carousel-wrapper">
                    <Carousel.Item>
                        <div className="slide-image d-block w-100" style={{backgroundImage: `url(${process.env.PUBLIC_URL + "/race-volunteers.jpg"})`}} />
                        <Carousel.Caption>
                            <h3>{intl.formatMessage({id : 'project.app.Home.joinCommunity'})}</h3>
                            <Row>
                                <Col md={9} className="d-flex flex-column flex-md-row">
                                    <Button variant="outline-primary" className="buttonSecondary mx-2 btn-sm">
                                        {intl.formatMessage({id : 'project.app.Home.IAmEntity'})}
                                    </Button>
                                    <Button variant="primary" className="buttonSecondary mx-2 btn-lg" onClick={() => navigate('/users/signup')}>
                                        {intl.formatMessage({id : 'project.app.Home.IWantBeVolunteer'})}
                                    </Button>
                                </Col>
                                <Col md={3} className="d-flex justify-content-end">
                                    <Button variant="secondary" className="buttonSecondary mx-2 btn-lg" onClick={() => navigate('/allProjects')}>
                                        {intl.formatMessage({id : 'project.global.buttons.searchProjects'})}
                                    </Button>
                                </Col>
                            </Row>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="slide-image-center d-block w-100" style={{backgroundImage: `url(${process.env.PUBLIC_URL + "/having-plants.jpg"})`}} />
                        <Carousel.Caption>
                            <h3>{intl.formatMessage({id : 'project.app.Home.joinCommunity'})}</h3>
                            <Row>
                                <Col md={9} className="d-flex flex-column flex-md-row">
                                    <Button variant="outline-primary" className="buttonSecondary mx-2 btn-sm">
                                        {intl.formatMessage({id : 'project.app.Home.IAmEntity'})}
                                    </Button>
                                    <Button variant="primary" className="buttonSecondary mx-2 btn-lg" onClick={() => navigate('/users/signup')}>
                                        {intl.formatMessage({id : 'project.app.Home.IWantBeVolunteer'})}
                                    </Button>
                                </Col>
                                <Col md={3} className="d-flex justify-content-end">
                                    <Button variant="secondary" className="buttonSecondary mx-2 btn-lg" onClick={() => navigate('/allProjects')}>
                                        {intl.formatMessage({id : 'project.global.buttons.searchProjects'})}
                                    </Button>
                                </Col>
                            </Row>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="slide-image-center d-block w-100" style={{backgroundImage: `url(${process.env.PUBLIC_URL + "/having-plants.jpg"})`}} />
                        <Carousel.Caption>
                            <h3>{intl.formatMessage({id : 'project.app.Home.joinCommunity'})}</h3>
                            <Row>
                                <Col md={9} className="d-flex flex-column flex-md-row">
                                    <Button variant="outline-primary" className="buttonSecondary mx-2 btn-sm">
                                        {intl.formatMessage({id : 'project.app.Home.IAmEntity'})}
                                    </Button>
                                    <Button variant="primary" className="buttonSecondary mx-2 btn-lg" onClick={() => navigate('/users/signup')}>
                                        {intl.formatMessage({id : 'project.app.Home.IWantBeVolunteer'})}
                                    </Button>
                                </Col>
                                <Col md={3} className="d-flex justify-content-end">
                                    <Button variant="secondary" className="buttonSecondary mx-2 btn-lg" onClick={() => navigate('/allProjects')}>
                                        {intl.formatMessage({id : 'project.global.buttons.searchProjects'})}
                                    </Button>
                                </Col>
                            </Row>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
};

export default NotLoggedUserShowLogin;