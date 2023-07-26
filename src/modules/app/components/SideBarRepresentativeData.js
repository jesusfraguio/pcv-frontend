import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SideBarRepresentativeData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Gestionar registros de horas',
        path: '/update-participation-hours',
        icon: <FaIcons.FaClock/>,
        cName: 'nav-text'
    },
    {
        title: 'Ver mis proyectos',
        path: '/projects-list',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Crear un nuevo proyecto',
        path: '/projects/create-project',
        icon: <FaIcons.FaChessRook />,
        cName: 'nav-text'
    },
    {
        title: 'Dar de alta un voluntario',
        path: '/create-volunteer',
        icon: <FaIcons.FaIdCard />,
        cName: 'nav-text'
    },
    {
        title: 'Dar de alta un representante',
        path: '/admin/create-representative',
        icon: <IoIcons.IoIosCreate />,
        cName: 'nav-text'
    }
    /*{
        title: 'Ver contribuciones de cada entidad',
        path: '/see-contributions',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    }*/
];