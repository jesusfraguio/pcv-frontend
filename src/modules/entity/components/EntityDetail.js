import React, { useState, useEffect } from 'react';
import * as actions from '../actions';
import * as projectActions from '../../project/actions';
import {useDispatch, useSelector} from "react-redux";
import {Card, Col, Row, Container, Button} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import {useMedia} from 'react-use';
import users from '../../users';
import {Errors} from "../../common";
import * as selectors from "../../project/selectors";

const EntityDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const intl = useIntl();
    const entities = useSelector(state => selectors.getCachedEntities(state));
    const { entityId } = useParams();
    const [entityData, setEntityData] = useState(null);
    const user = useSelector(users.selectors.getUser);
    const isRepresentative = useSelector(users.selectors.isRepresentative);
    const [backendErrors, setBackendErrors] = useState(null);
    const entityLogo = entities[entityId]?.image;
    const isDesktop = useMedia('(min-width: 992px)');
    const rightPixels = isDesktop ? 35 : 0;

    useEffect(() => {
        actions.findEntityDetails(entityId, entity => setEntityData(entity));
    },[]);
    useEffect(() => {
        if(!entityLogo){
            dispatch(projectActions.getLogo(entityId));
        }
        }
    , []);

    return <div>
        <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
        {entityData && <Container>
            <Card>
                <Row className="my-5">
                    <Col md={4}>
                        <Card.Img
                            variant="top"
                            src={entityLogo}
                            alt="Entity Logo"
                            style={{
                                maxWidth: '200px',
                                maxHeight: '100%',
                                position: 'relative',
                                top: {rightPixels}+'px',
                                left: '25px'
                            }}
                        />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            {isDesktop ? (
                                <>
                                    <Card.Title>{entityData.name}</Card.Title>
                                    <Card.Text>{entityData.shortDescription}</Card.Text>
                                </>
                            ) : (
                                <Card.Title>{entityData.name}</Card.Title>
                            )}
                            <Card.Text>
                                <FormattedMessage id="project.common.url.web" />{' '}
                                <a href={entityData.url}>{entityData.url}</a>
                            </Card.Text>
                            <Card.Text>
                                <FormattedMessage id="project.global.fields.phone" />: {entityData.phone}
                            </Card.Text>
                            <Card.Text>
                                <FormattedMessage id="project.global.fields.email" />:{' '}
                                <a href={`mailto:${entityData.email}`}>{entityData.email}</a>
                            </Card.Text>
                            <Card.Text>
                                <FormattedMessage id="project.global.fields.address" />: {entityData.address}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>}
    </div>
}
export default EntityDetail;