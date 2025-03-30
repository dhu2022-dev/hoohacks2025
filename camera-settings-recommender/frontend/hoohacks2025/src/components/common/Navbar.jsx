import { NavLink } from 'react-router-dom';
import '../../styles/navbar.css';
import logo from '../../assets/camera_logo.jpg';

function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 py-4">
      <div className="container-fluid px-4 flex justify-between items-center">
        {/* Left Side - Brand */}
        <div className="flex items-center">
          <NavLink 
            to="/" 
            className="text-xl font-serif text-white hover:opacity-80 transition-opacity duration-300 no-underline"
          >
            Shuttersense
          </NavLink>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <NavLink 
            to="/" 
            className="block hover:opacity-75 transition-opacity duration-300"
          >
            <img
              src={logo}
              alt="Shuttersense Logo"
              className="h-24 w-24 object-contain"
            />
          </NavLink>
        </div>

        {/* Right Side - Navigation Links */}
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className="text-lg font-serif text-white transition-colors duration-200 relative group no-underline"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink
            to="/upload"
            className="text-lg font-serif text-white transition-colors duration-200 relative group no-underline"
          >
            Upload
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;