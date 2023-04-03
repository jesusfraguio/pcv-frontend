import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Ver mis proyectos',
        path: '/reports',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Crear un nuevo proyecto',
        path: '/products',
        icon: <FaIcons.FaChessRook />,
        cName: 'nav-text'
    },
    {
        title: 'Dar de alta un usuario',
        path: '/create-user',
        icon: <FaIcons.FaIdCard />,
        cName: 'nav-text'
    },
    {
        title: 'Dar de alta un representante',
        path: '/create-representative',
        icon: <IoIcons.IoIosCreate />,
        cName: 'nav-text'
    },
    {
        title: 'Ver contribuciones de cada entidad',
        path: '/see-contributions',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Crear una entidad',
        path: '/create-entity',
        icon: <FaIcons.FaBrush />,
        cName: 'nav-text'
    },
    {
        title: 'Eliminar a un usuario',
        path: '/delete-user',
        icon: <FaIcons.FaHammer />,
        cName: 'nav-text'
    }
];