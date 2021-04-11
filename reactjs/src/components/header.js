import { Navbar, Nav } from 'react-bootstrap';
import '../styles/header.scss';

const Header = () => {
    return (
        <Navbar expand='lg' className='header' fixed='top'>
            <Navbar.Brand href='/home' className='brand'>
                Social Media Sentiment Analysis
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />

            <Navbar.Collapse className='tabs'>
                <Nav
                    variant='pills'
                    className='ml-auto'
                    as='ul'
                    activeKey={window.location.pathname}
                >
                    <Nav.Item as='li'>
                        <Nav.Link href='/home'>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as='li'>
                        <Nav.Link href='/socialmediaanalysis'>
                            Social Media Analysis
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as='li'>
                        <Nav.Link href='/about'>About</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
