import React, { useState, useEffect } from 'react';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {useDispatch, useSelector} from "react-redux";
import {Card, Col, Row, Container, ListGroup, Button} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import './ProjectDetail.css';
import {useIntl} from "react-intl";
import users from '../../users';
import {Errors} from "../../common";

const ProjectDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const intl = useIntl();
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState(null);
    const odsList = useSelector(selectors.getOds);
    const user = useSelector(users.selectors.getUser);
    const [backendErrors, setBackendErrors] = useState(null);

    useEffect(() => {
        dispatch(actions.findProjectDetails(projectId, project => setProjectData(project)));
    },[])

    const handleClick = () => {
        dispatch(actions.createParticipationAsVolunteer(({recommended: false, volunteerId: user.id, projectId: projectId}),
            message => navigate("/projects/createMyParticipation-completed"),
            errors => setBackendErrors(errors)));
    };

    return <div>
        <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
        {projectData && <Container>
            <Row className="my-5">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className="project-title">{projectData.name}</Card.Title>
                            <br/>
                            <Card.Subtitle className="mb-2 subtitle-center">{projectData.entityName}</Card.Subtitle>
                            <br/>
                            <Row>
                                <Col md={6}>
                            <Card.Text className="almost-center-text">
                                <span className="placeholder-bold">{intl.formatMessage({id : 'project.global.fields.shortDescription.title'})}</span>
                                <br />
                                {projectData.shortDescription}
                            </Card.Text>
                            <Card.Text className="almost-center-text ">
                                <span className="placeholder-bold">{intl.formatMessage({id : 'project.global.fields.longDescription'})}</span>
                                <br />
                                {projectData.longDescription}
                            </Card.Text>
                            <Card.Text className="almost-center-text">
                                <span className="placeholder-bold">{intl.formatMessage({id : 'project.global.fields.schedule'})}</span>
                                <br />
                                {projectData.schedule}
                            </Card.Text>
                            <ListGroup className="list-group-flush almost-center-text">
                                <ListGroup.Item>
                                    <Card.Text>
                                      <span className="placeholder-bold">
                                        {intl.formatMessage({ id: 'project.global.fields.tasks' })}
                                      </span>
                                        <ul>
                                            {projectData.tasks.map((task, index) => (
                                                <li key={index}>{task}</li>
                                            ))}
                                        </ul>
                                    </Card.Text>
                                </ListGroup.Item>
                            </ListGroup>
                                </Col>
                                <Col md={6}>
                            <Card.Text className="almost-center-text">
                                <span className="placeholder-bold">{intl.formatMessage({id : 'project.global.fields.preferableVolunteer'})}</span>
                                <br />
                                {projectData.preferableVolunteer}
                            </Card.Text>
                            <Card.Text className="almost-center-text">
                                <span className="placeholder-bold">{intl.formatMessage({id : 'project.global.fields.collaborationArea'})}</span>
                                <br />
                                {projectData.areaName}
                            </Card.Text>
                                    <Card.Text className="almost-center-text">
                                        <span className="placeholder-bold">{intl.formatMessage({id : 'project.global.fields.locality'})}</span>
                                        <br />
                                        {projectData.locality}
                                    </Card.Text>
                                    <ListGroup className="list-group-flush almost-center-text">
                                        <ListGroup.Item>
                                            <Card.Text>
                                              <span className="placeholder-bold">
                                                {intl.formatMessage({ id: 'project.global.fields.ods' })}
                                              </span>
                                                <ul>
                                                    {projectData.ods.map((odsId, index) => {
                                                        const odsItem = odsList.find((item) => item.id === odsId);
                                                        return <li key={index}>{odsItem ? odsItem.name : ''}</li>;
                                                    })}
                                                </ul>
                                            </Card.Text>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <Row className="mt-4">
                                        <Col md={5}>
                                            {/* Empty space to center button */}
                                        </Col>
                                        <Col md={4} className="d-flex justify-content-center">
                                            <Button onClick={handleClick} className="addParticipation-button">{intl.formatMessage({ id: 'project.global.buttons.interested' })}</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>}
    </div>
}
export default ProjectDetail;