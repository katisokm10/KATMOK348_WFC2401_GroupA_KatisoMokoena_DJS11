import 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AiFillThunderbolt, AiOutlineLogout } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import { RiHomeLine } from 'react-icons/ri';
import SearchBar from './SearchBar'; // Import SearchBar component

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate hook to navigate programmatically

  // Conditionally render header only if not on login page
  if (location.pathname === '/') {
    return null; // Render nothing if on the login page
  }

  const handleSearch = (searchQuery) => {
    // Handle search functionality here, e.g., navigate to search results page
    console.log('Searching for:', searchQuery);
    // Example: navigate to search results page
    // history.push(`/search?q=${searchQuery}`);
  };

  const handleLogout = () => {
    // Implement logout logic here, e.g., clear session, remove tokens, etc.
    // For demo purposes, simulate logout and navigate to login page
    console.log('Logging out...');
    navigate('/'); // Navigate to login page
  };

  return (
    <header className="bg-navy-900 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-start">
          <div className="flex flex-col items-start">
            <Link to="/home" className="text-white text-3xl font-bold flex items-center hover:text-blue-300 transition duration-300 mb-2">
              <AiFillThunderbolt className="mr-2 text-blue-300" />
              PodPlay
            </Link>
            <nav className="flex flex-col space-y-2">
              <Link to="/home" className="text-white text-lg flex items-center hover:text-blue-300 transition duration-300 font-bold">
                <RiHomeLine className="mr-2" />
                Home
              </Link>
              
              <Link to="/genres" className="text-white text-lg flex items-center hover:text-blue-300 transition duration-300 font-bold">
                <FaRegHeart className="mr-2" />
                Favourites
              </Link>
            </nav>
          </div>
          <div className="flex-grow mx-8">
            {/* Include the SearchBar component */}
            <SearchBar onSearch={handleSearch} />
          </div>
          <button
            onClick={handleLogout} // Call handleLogout function on button click
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center transition duration-300"
          >
            <AiOutlineLogout className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
