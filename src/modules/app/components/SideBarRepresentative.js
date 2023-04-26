import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
//import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { SideBarRepresentativeData } from './SideBarRepresentativeData';
import './SideBar.css';
//import { IconContext } from 'react-icons';

function SideBarRepresentative() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <div className="navbar">
                {!sidebarOpen && (
                    <Link to="#" className="menu-bars" onClick={toggleSidebar}>
                        <FaIcons.FaBars />
                    </Link>
                )}
            </div>
            {sidebarOpen && (
                <nav className="nav-menu">
                    <button className="close-button" onClick={toggleSidebar}>
                        <AiIcons.AiOutlineClose />
                    </button>
                    <ul className="nav-menu-items">
                        {SideBarRepresentativeData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path} onClick={toggleSidebar}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}
        </>
    );
}

export default SideBarRepresentative;