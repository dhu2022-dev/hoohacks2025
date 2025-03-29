import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo/Brand */}
        <NavLink to="/" className="text-2xl font-light text-gray-800 hover:text-gray-600">
          PhotoStudio
        </NavLink>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg ${isActive ? 'text-gray-800 font-semibold' : 'text-gray-500 hover:text-gray-700'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `text-lg ${isActive ? 'text-gray-800 font-semibold' : 'text-gray-500 hover:text-gray-700'}`
            }
          >
            Upload
          </NavLink>
          <NavLink
            to="/result"
            className={({ isActive }) =>
              `text-lg ${isActive ? 'text-gray-800 font-semibold' : 'text-gray-500 hover:text-gray-700'}`
            }
          >
            Result
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;