import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <div id="sidebar">
                <Dropdown.Menu show>
                <Dropdown.Item eventKey="1"><Link to="/">Home</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    
                    <Dropdown.Item href="/signin" eventKey="2">Sign in</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="3">Football</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Add Article</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="5">Community</Dropdown.Item>
                </Dropdown.Menu>
            </div>
            
        </>
    );
}

export default NavBar;