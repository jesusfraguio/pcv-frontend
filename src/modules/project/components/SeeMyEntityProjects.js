import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import {useEffect, useState} from 'react';

import * as actions from '../actions';
import * as entityActions from '../../entity/actions';
import * as selectors from '../selectors';
import {Pager} from "../../common";
import EntityProjects from "./EntityProjects";
import Select from "react-select";

const SeeMyEntityProjects = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

    const [entitySearch, setEntitySearch] = useState(null);
    const [selectedEntity, setSelectedEntity] = useState(null);

    useEffect(() => {
        entityActions.findAllEntity(entityBlock => setEntitySearch(entityBlock.items.map(e => ({ value: e.id, label: e.name }))))
    }, []);

    useEffect(() => {
        if (!selectedEntity || !selectedEntity[0]?.value) {
            dispatch(actions.findEntityProjects({
                page: 0,
            }));
        }
        else{
            dispatch(actions.findEntityProjects({
                page: 0,
                entityId: selectedEntity[0].value
            }));
        }

    }, [selectedEntity]);

    const entityProjects = useSelector(selectors.getEntityProjects);

    if (!entityProjects) {
        return null;
    }

    if (entityProjects.result.items.length === 0) {
        return (
            <div>
                <Select
                    options={entitySearch}
                    value={selectedEntity}
                    onChange={setSelectedEntity}
                    isSearchable={true}
                    isMulti={false}
                    isClearable={true}
                    placeholder={intl.formatMessage({id: "project.global.fields.myEntity"})}
                />
                <div className="alert alert-info" role="alert">
                    <FormattedMessage id='project.projects.noProjectsFound'/>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Select
                options={entitySearch}
                value={selectedEntity}
                onChange={setSelectedEntity}
                isSearchable={true}
                isMulti={true}
                isClearable={true}
                placeholder={intl.formatMessage({id: "project.global.fields.myEntity"})}
            />
            <div className="mt-2" id='find-project-result-wrapper'>
                <EntityProjects entityProjects={entityProjects.result.items} entity={selectedEntity} />
                <Pager
                    back={{
                        enabled: entityProjects.criteria.page >= 1,
                        onClick: () => dispatch(actions.previousFindEntityProjectsResultPage(entityProjects.criteria))}}
                    next={{
                        enabled: entityProjects.result.existMoreItems,
                        onClick: () => dispatch(actions.nextFindEntityProjectsResultPage(entityProjects.criteria))}}/>
            </div>
        </div>
    );

}

export default SeeMyEntityProjects;