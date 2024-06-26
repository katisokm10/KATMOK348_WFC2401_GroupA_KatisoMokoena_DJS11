import 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.search.value.trim();
    if (searchQuery) {
      onSearch(searchQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        name="search"
        placeholder="Search episodes, channels"
        className="w-full p-2 pl-10 rounded-full border-2 border-blue-700 bg-navy-800 text-white focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <AiOutlineSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 text-xl cursor-pointer"
        onClick={handleSearch}
      />
    </form>
  );
};

// PropTypes validation
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // Validate onSearch as a required function prop
};

export default SearchBar;
