import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {FormattedMessage, useIntl} from 'react-intl';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

import users from '../../users';
import admin from '../../admin';

const Header = () => {

    const userName = useSelector(users.selectors.getEmail);
    const myEntityName = useSelector(admin.selectors.getMyEntity);
    const intl = useIntl();
    return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand style={{ fontSize: '1.4rem', fontWeight: 'lighter', marginLeft: '5px'}} href="/"> Plataforma Coruñesa de Voluntariado</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/main/who" style={{ backgroundColor: '#1ec7cd', color: '#fff', padding: '6px 12px', borderRadius: '4px', marginRight: '15px' }}>
                    <FormattedMessage id="project.header.whoWeAre"/>
                </Nav.Link>
                <Nav.Link href="/main/what" style={{ backgroundColor: '#1ec7cd', color: '#fff', padding: '6px 12px', borderRadius: '4px', marginRight: '15px' }}>
                    <FormattedMessage id="project.header.whatAreWeDoing"/>
                </Nav.Link>
                <Nav.Link href="/main/2030Agenda" style={{ backgroundColor: '#1ec7cd', color: '#fff', padding: '6px 12px', borderRadius: '4px', marginRight: '15px' }}>
                    <FormattedMessage id="project.header.2030Agenda"/>
                </Nav.Link>
                <Nav.Link href="/projects/myProjects" style={{ backgroundColor: '#1ec7cd', color: '#fff', padding: '6px 12px', borderRadius: '4px', marginRight: '15px' }}>
                    <FormattedMessage id="project.header.projects"/>
                </Nav.Link>
                <Nav.Link href="/entities/seeEntities" style={{ backgroundColor: '#1ec7cd', color: '#fff', padding: '6px 12px', borderRadius: '4px', marginRight: '15px' }}>
                    <FormattedMessage id="project.header.entities"/>
                </Nav.Link>
            </Nav>
            <Nav>
                {userName ? (
                    <NavDropdown title={userName} id="user-dropdown">
                        <NavDropdown.Item as={Link} to="/users/update-profile">
                            <FormattedMessage id="project.users.UpdateProfile.title" />
                        </NavDropdown.Item>
                        {myEntityName &&
                            <NavDropdown.Item as={Link} to="/admin/update-my-entity">
                                {intl.formatMessage({ id: 'project.updateEntity.title' }, { name: myEntityName.name})}
                            </NavDropdown.Item>
                        }
                        <NavDropdown.Item as={Link} to="/users/change-password">
                            <FormattedMessage id="project.users.ChangePassword.title" />
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/users/logout">
                            <FormattedMessage id="project.app.Header.logout" />
                        </NavDropdown.Item>
                    </NavDropdown>
                ) : (
                    <Nav.Link href="/users/login" style={{ backgroundColor: '#c634e2', color: '#fff', padding: '6px 12px', borderRadius: '6px' }}>
                        <FormattedMessage id="project.users.Login.title"/>
                    </Nav.Link>
                )}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
};


export default Header;
