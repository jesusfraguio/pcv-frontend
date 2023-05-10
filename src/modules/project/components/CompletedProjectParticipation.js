import React from 'react';
import {FormattedMessage, useIntl} from 'react-intl';

const CompletedProjectParticipation = () => {
    const intl = useIntl();

    return (
        <div>
            <div className="alert alert-success" role="alert">
                <FormattedMessage id="project.project.CreateParticipationCompleted.title"/>
                &nbsp;
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-5 d-flex justify-content-end">
                        <button className="mainButton btn btn-primary">
                            {intl.formatMessage({ id: 'project.users.MyProfile.title' })}
                        </button>
                    </div>
                    <div className="col-2">
                        {/* Empty div to maintain spacing */}
                    </div>
                    <div className="col-5 d-flex justify-content-start">
                        <button className="mainButton btn btn-primary">
                            {intl.formatMessage({ id: 'project.project.FindMoreProjects.title' })}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CompletedProjectParticipation