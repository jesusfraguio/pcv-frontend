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
    const isRepresentative = useSelector(users.selectors.isRepresentative);
    const [backendErrors, setBackendErrors] = useState(null);

    useEffect(() => {
        dispatch(actions.findProjectDetails(projectId, project => setProjectData(project)));
    },[])

    const handleClick = () => {
        user!==null ?
        dispatch(actions.createParticipationAsVolunteer(({recommended: false, volunteerId: user.id, projectId: projectId}),
            message => navigate("/projects/createMyParticipation-completed"),
            errors => setBackendErrors(errors)))
        :navigate("/users/login");
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
                            <Card.Subtitle className="mb-2 subtitle-center"><Link to={`/entities/${projectData.entityId}`} className="name-link">
                                {projectData.entityName} </Link> </Card.Subtitle>
                            <br/>
                            <Row>
                                <Col md={6}>
                            <Card.Text className="almost-center-text">
                                <p className="placeholder-bold" style={{ whiteSpace: 'pre-wrap' }}>{intl.formatMessage({id : 'project.global.fields.shortDescription.title'})}</p>
                                <p>{projectData.shortDescription}</p>
                            </Card.Text>
                            <Card.Text className="almost-center-text " style={{ whiteSpace: 'pre-wrap' }}>
                                <p className="placeholder-bold">{intl.formatMessage({id : 'project.global.fields.longDescription'})}</p>

                                <p>{projectData.longDescription}</p>
                            </Card.Text>
                            <Card.Text className="almost-center-text">
                                <p className="placeholder-bold">{intl.formatMessage({id : 'project.global.fields.schedule'})}</p>

                                <p>{projectData.schedule}</p>
                            </Card.Text>
                                <ListGroup className="list-group-flush no-padding">
                                    <ListGroup.Item className="no-padding">
                                        <Card.Text className="almost-center-text">
                                          <p className="placeholder-bold">
                                            {intl.formatMessage({ id: 'project.global.fields.tasks' })}
                                          </p>
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
                                <p className="placeholder-bold">{intl.formatMessage({id : 'project.global.fields.preferableVolunteer'})}</p>

                                <p> {projectData.preferableVolunteer} </p>
                            </Card.Text>
                            <Card.Text className="almost-center-text">
                                <p className="placeholder-bold">{intl.formatMessage({id : 'project.global.fields.collaborationArea'})}</p>

                                <p> {projectData.areaName} </p>
                            </Card.Text>
                                    <Card.Text className="almost-center-text">
                                        <p className="placeholder-bold">{intl.formatMessage({id : 'project.global.fields.locality'})}</p>

                                        {projectData.locality}
                                    </Card.Text>
                                    <ListGroup className="list-group-flush no-padding">
                                        <ListGroup.Item className="no-padding">
                                            <Card.Text className="almost-center-text">
                                              <p className="placeholder-bold">
                                                {intl.formatMessage({ id: 'project.global.fields.ods' })}
                                              </p>
                                                <ul>
                                                    {projectData.ods.map((odsId, index) => {
                                                        const odsItem = odsList.find((item) => item.id === odsId);
                                                        return <li key={index}>{odsItem ? odsItem.name : ''}</li>;
                                                    })}
                                                </ul>
                                            </Card.Text>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col md={4}>
                                    {/* Empty space to center button */}
                                </Col>
                                {
                                    !isRepresentative ?
                                    <Col md={4} className="d-flex justify-content-center">
                                        <Button onClick={handleClick}
                                                className="addParticipation-button">{intl.formatMessage({id: 'project.global.buttons.interested'})}</Button>
                                    </Col>
                                        :
                                        <Col md={4} className="d-flex justify-content-center">
                                            <Button
                                                    className="recommend-button">{intl.formatMessage({id: 'project.global.buttons.recommendProject'})}</Button>
                                        </Col>

                                }
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>}
    </div>
}
export default ProjectDetail;