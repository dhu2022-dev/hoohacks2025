import { NavLink } from 'react-router-dom';
import { Navbar as BSNavbar, Nav } from 'react-bootstrap';
import '../../styles/navbar.css';
import logo from '../../assets/camera_logo.jpg';

function Navbar({ darkMode }) {
  return (
    <BSNavbar 
      expand="lg" 
      bg={darkMode ? "dark" : "light"} 
      variant={darkMode ? "dark" : "light"} 
      className={`${darkMode ? "border-b border-gray-700" : "border-b border-gray-200"} py-3`}
    >
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Left Side - Optional Content */}
          <div className="d-flex align-items-center" style={{ width: '160px' }}>
            <BSNavbar.Brand 
              as={NavLink} 
              to="/" 
              className={`text-xl font-medium ${darkMode ? "text-gray-100" : "text-gray-800"} hover-opacity`}
            >
              Shuttersense
            </BSNavbar.Brand>
          </div>

          {/* Center - Logo Placeholder */}
          <div className="mx-auto position-absolute start-50 translate-middle-x">
                <NavLink 
                  to="/" 
                  className="d-block hover:opacity-75 transition-opacity"
                >
                  <img
                    src={logo}// 👈 Replace this with your image path
                    alt="Shuttersense Logo"
                    className="h-20 w-20 object-contain" // Adjust size as needed
                  />
                </NavLink>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="d-flex align-items-center justify-content-end" style={{ width: '160px' }}>
            <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BSNavbar.Collapse id="basic-navbar-nav">
              <Nav className="align-items-center">
                <Nav.Link 
                  as={NavLink} 
                  to="/" 
                  className={`nav-link-hover px-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Home
                </Nav.Link>
                <Nav.Link 
                  as={NavLink} 
                  to="/upload" 
                  className={`nav-link-hover px-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Upload
                </Nav.Link>
              </Nav>
            </BSNavbar.Collapse>
          </div>
        </div>
      </div>
    </BSNavbar>
  );
}

export default Navbar;