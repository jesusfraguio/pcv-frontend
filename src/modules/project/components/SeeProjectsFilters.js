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
    //const [findAuto, setAuto] = useState(false);
    useEffect(() => {
    },[areaList])
    const optionsAreas = areaList ? [
        { value: null, label: (intl.formatMessage({ id: 'project.allAreas.title'})) },
        ...areaList?.map((a) => ({
            value: a.id,
            label: a.name,
        })),
    ] : [];

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(actions.findProjects(
            {
                collaborationAreaId: areaId.value ? areaId.value : null,
                locality: locality ? locality.trim() : null,
                name: name.trim(),
                sortValue : null,
                sortOrder: null,
                page: 0,
            }));
        setSearched(true);
        //navigate('/project/find-projects-result')
    }
/*
    function searchAuto(){
        if(!findAuto){
            document.getElementById("search").click()
            setAuto(true)
        }
    }
*/
    // eslint-disable-next-line
    //useEffect(() => {setTimeout(searchAuto,1200);},[]);
    return (

        <div className="row" id="find-project-wrapper">
            <div className="col">
                <button type="button" className="btn btn-primary buttonGrey"
                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <FormattedMessage id='project.project.buttons.addFilter'/>
                </button>
            </div>

            <div className="col">
                <form className="form-inline mt-2 mt-md-0" onSubmit={e => handleSubmit(e)}>
                    <div className="modal modal-fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        <FormattedMessage id='project.project.FindProject.title'/>
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div id="find-project-wrapper" className="form_field">
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="category">
                                                    <FormattedMessage id="project.global.fields.collaborationArea"/>
                                                </label>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="shortDescription">
                                                    <FormattedMessage id="project.global.fields.name"/>
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
                                                />
                                            </div>
                                            <div className="col">
                                                <input id="keywords" type="text" className="form-control mr-sm-2"
                                                       value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <br/>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        <FormattedMessage id='project.project.buttons.addFilter'/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    <button type="submit" className="btn btn-primary buttonSecondary" id="search" data-bs-dismiss="modal">
                        <FormattedMessage id='project.global.buttons.searchProjects' />
                    </button>
                </form>
            </div>

            {searched && <SeeProjectsResult/>}

        </div>


    );
}
export default SeeProjectsFilters;