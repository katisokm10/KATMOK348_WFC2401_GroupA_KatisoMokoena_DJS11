import 'react';
import { Link } from 'react-router-dom';
import { AiFillThunderbolt, AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import { RiHomeLine } from 'react-icons/ri';

const Header = () => {
  return (
    <header className="bg-navy-900 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-start">
          <div className="flex flex-col items-start">
            <Link to="/" className="text-white text-3xl font-bold flex items-center hover:text-blue-300 transition duration-300 mb-2">
              <AiFillThunderbolt className="mr-2 text-blue-300" />
              PodPlay
            </Link>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-white text-lg flex items-center hover:text-blue-300 transition duration-300">
                <RiHomeLine className="mr-2" />
                Home
              </Link>
              <Link to="/genres" className="text-white text-lg flex items-center hover:text-blue-300 transition duration-300">
                <FaRegHeart className="mr-2" />
                Favourites
              </Link>
            </nav>
          </div>
          <div className="flex-grow mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search episodes, channels"
                className="w-full p-2 pl-10 rounded-full border-2 border-blue-700 bg-navy-800 text-white focus:outline-none focus:border-blue-500 transition duration-300"
              />
              <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 text-xl" />
            </div>
          </div>
          <button className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center transition duration-300">
            <AiOutlineLogout className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;