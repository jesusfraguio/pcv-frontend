import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Badge } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import './Notification.css';
import * as selectors from "../../participation/selectors";
import {useInterval, useMedia} from 'react-use';
import {findAllPendingParticipations} from "../../participation/actions";
import {useNavigate} from "react-router-dom";

const NotificationBell = () => {
    const participationSearch = useSelector(selectors.getPendingParticipations);
    const dispatch = useDispatch();
    const pendingParticipations = participationSearch?.result?.items?.filter(participation => participation.status === 'PENDING').length;
    const navigate = useNavigate();
    let firstRender = false;

    const isDesktop = useMedia('(min-width: 992px)');
        // first render
    useEffect(() => {
        if(!firstRender) {
            dispatch(findAllPendingParticipations({
                page: 0,
                size: 10
            }));
            firstRender = true;
        }
    }, []);

    useInterval(() => {
        dispatch(findAllPendingParticipations({
            page: 0,
            size: 10
        }));
    }, 70 * 1000); //Each 70s

    const handleBellClick = () => {
        navigate('/pendingParticipations');
    }
    return (
        <div className="bell-container" onClick={handleBellClick}>
            <div className={isDesktop ? "d-flex align-items-center" : "text-center"}>
                <FaBell className={isDesktop ? "notification-bell" : "notification-bell-mobile"} />
                <Badge variant="danger" className={isDesktop ? "bell-badge" : "bell-badge-mobile"}>{pendingParticipations}</Badge>
            </div>
        </div>
    );
}

export default NotificationBell;