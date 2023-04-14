//import * as actionTypes from './actionTypes';
import backend from '../../backend';

/*const createRepresentativeCompleted = msg => ({
    type: actionTypes.CREATE_REPRESENTATIVE_COMPLETED,
    msg
});*/

export const createRepresentative = (user, onSuccess, onErrors) => dispatch =>
    backend.adminService.registerRepresentative(user,
        msg => {
            //dispatch(createRepresentativeCompleted(msg));
            onSuccess(msg);
        },
        onErrors
);
