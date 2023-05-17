import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link, useNavigate} from 'react-router-dom';

import React from 'react';
import Table from 'react-bootstrap/Table';
import {Button} from "react-bootstrap";
import entities from "../../admin";

const EntityProjects = ({ entityProjects }) => {
    const intl = useIntl();
    const myEntity = useSelector(entities.selectors.getMyEntity);

    function handleSeeParticipants(id) {
        //TODO
    }

    return (
        <Table>
            <thead>
            <tr>
                <th>{intl.formatMessage({id : 'project.projectName.title'})}</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {entityProjects.map((project, index) => (
                <tr key={index}>
                    <td>
                        <Link to={`/projects/${project.id}`} className="name-link">
                            {project.name}
                        </Link>
                    </td>
                    <td style={{border: 'none'}}>
                        <Button variant="primary" className="mainButton">
                            {intl.formatMessage({id : 'project.project.toggleOds.title'})}</Button>
                    </td>
                    <td style={{border: 'none'}}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                            {myEntity?.id === project.entityId &&
                                <Button variant="primary" className="mainButton">
                                    {intl.formatMessage({id : 'project.project.update.title'})}</Button>
                            }
                            {myEntity?.id === project.entityId &&
                                <Button variant="primary" className="mainButton" onClick={() => handleSeeParticipants(project.id)}>
                                    {intl.formatMessage({id : 'project.project.seeParticipants.title'})}</Button>
                            }
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default EntityProjects;