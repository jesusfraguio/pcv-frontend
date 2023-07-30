import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormattedMessage, useIntl} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import * as actions from '../actions';
import Select from "react-select";
import * as selectors from "../selectors";
import SeeProjectsResult from "./SeeProjectsResult";

const SeeProjectsFilters = () => {
    const [areaId, setAreaId] = useState('');
    const [name, setName] = useState('');
    const [locality, setLocality] = useState('');
    const intl = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const areaList = useSelector(selectors.getAreas);
    const [searched,setSearched] = useState(false);
    const [findAuto, setAuto] = useState(false);

    useEffect(() => {
        if(findAuto){
            handleSubmit();
        }
    },[areaId]);

    const optionsAreas = areaList ? [
        { value: null, label: (intl.formatMessage({ id: 'project.allAreas.title'})) },
        ...areaList?.map((a) => ({
            value: a.id,
            label: a.name,
        })),
    ] : [];

    const handleSubmit = () => {
        dispatch(actions.findProjects(
            {
                collaborationAreaId: areaId.value ? areaId.value : null,
                locality: locality ? locality.trim() : null,
                name: name.trim(),
                sortValue : null,
                sortOrder: null,
                page: 0,
                size: 6
            }));
        setSearched(true);
        //navigate('/project/find-projects-result')
    }

    useEffect(() => {
        searchAutoFunc();
    }, []);

    function searchAutoFunc(){
        if(!findAuto){
            dispatch(actions.findProjects(
                {
                    collaborationAreaId: areaId.value ? areaId.value : null,
                    locality: locality ? locality.trim() : null,
                    name: name.trim(),
                    sortValue : null,
                    sortOrder: null,
                    page: 0,
                    size: 6,
                }));
            setAuto(true);
            setSearched(true);
        }
    }
    // eslint-disable-next-line
    //useEffect(() => {setTimeout(searchAuto,1200);},[]);
    return (

        <div className="row" id="find-project-wrapper">
            <div className="col">
                <div className="d-flex justify-content-center">
                    <div id="find-project-wrapper2" className="form_field">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="category">
                                    <FormattedMessage id="project.global.fields.collaborationArea"/>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Select
                                    options={optionsAreas}
                                    value={areaId}
                                    onChange={setAreaId}
                                    isSearchable={true}
                                    isMulti={false}
                                    isClearable={false}
                                    placeholder={intl.formatMessage({ id: 'project.allAreas.title'})}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col mt-4">
                <input id="keywords" type="text" className="form-control mr-sm-2" placeholder={intl.formatMessage({id: "project.search.fields.projectName"})}
                       value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="col mt-4">
                <button type="submit" className="btn btn-primary buttonSecondary" id="search" data-bs-dismiss="modal" onClick={()=> handleSubmit()}>
                    <FormattedMessage id='project.global.buttons.searchProjects' />
                </button>
            </div>

            {searched && <SeeProjectsResult/>}

        </div>


    );
}
export default SeeProjectsFilters;