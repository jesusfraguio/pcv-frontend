import React, { useState, useEffect } from 'react';
import {Errors, Success} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {useDispatch, useSelector} from "react-redux";
import {Card, Col, Row, CardGroup, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import './Project.css';

const ProjectList = ({ projects }) => {
    const entities = useSelector(state => selectors.getCachedEntities(state));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let projectWithoutLogoLength = 0;
    let numberOfEntities = entities ? Object.keys(entities).length : 0;


    const handleClick = (project,e) => {
        e.preventDefault();
        if (!e.target.closest('a')) {  // Check if the clicked element or its ancestor is a link
            navigate(`/projects/${project.id}`);
        }
    };
    const handleEntityClick = (e, entityId) => {
        e.preventDefault();
        navigate(`/entities/${entityId}`);
    };

    useEffect(() => {
        const projectsWithoutLogo = entities ? projects.filter(project => !entities[project.entityId]) : projects;

        // All projects have their logos cached
        if (projectsWithoutLogo.length === 0) {
            return;
        }
        else{
            projectWithoutLogoLength=projectsWithoutLogo.length;
        }
        projectsWithoutLogo.map(project => dispatch(actions.getLogo(project.entityId)));
        //const imageUrls = images.map(image => URL.createObjectURL(image.blob()));
        //setImages(imageUrls);

    }, [projects,entities]);


    if (numberOfEntities===0 || numberOfEntities < numberOfEntities+projectWithoutLogoLength) {
        return <Spinner animation="border" role="status"> </Spinner>;
    }

    return (
        <Row xs={1} md={2} lg={3}>
            {projects.map((project, index) => {
                const image = entities[project.entityId]?.image;
                return (
                    <CardGroup>
                    <Col key={project.id}>
                        <Card className="style-card" style={{ width: '18rem' }} onClick={(e) => handleClick(project,e)}>
                            <Card.Img variant="top" src={image} alt={project.name} style={{ maxWidth: '100%', maxHeight: '150px' }} />
                            <Card.Body>
                                <Card.Title>{project.name}</Card.Title>
                                <Card.Text>{project.areaName}</Card.Text>
                                <Card.Text>
                                    <Link to={`/entities/${project.entityId}`} onClick={(e) => handleEntityClick(e,project.entityId)}>
                                        {project.entityName}
                                    </Link>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    </CardGroup>
                );
            })}
        </Row>
    );
};

export default ProjectList;