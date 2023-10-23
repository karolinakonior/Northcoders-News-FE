import Dropdown from 'react-bootstrap/Dropdown';

const NavBar = () => {
    return (
        <>
            <div id="sidebar">
                <Dropdown.Menu show>
                    <Dropdown.Item eventKey="1">Home</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="2">Coding</Dropdown.Item>
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