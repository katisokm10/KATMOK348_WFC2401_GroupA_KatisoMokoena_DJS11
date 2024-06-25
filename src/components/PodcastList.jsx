import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const PodcastList = ({ podcasts }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://your-genre-api-url'); // Replace with your genre API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }
        const data = await response.json();
        setGenres(data); // Assuming data is an array of genre objects with id and name
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const getGenreNameById = (genreId) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : 'Loading...';
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + '...';
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {podcasts.map((podcast) => (
          <Link to={`/podcast/${podcast.id}`} key={podcast.id} className="bg-white rounded-lg shadow-lg overflow-hidden block transform transition duration-300 hover:scale-105">
            {podcast.image ? (
              <img src={podcast.image} alt={podcast.title} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-700">No Image</span>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-gray-900">{podcast.title}</h2>
              <p className="text-gray-800 mb-2">
                {truncateDescription(podcast.description, 100)}
              </p>
              <div className="flex flex-col">
                <span className="text-gray-700 mb-2">
                  Genre: {getGenreNameById(podcast.genre_id)}
                </span>
                <span className="text-gray-700 mb-2">Seasons: {podcast.seasons}</span>
                <span className="text-gray-700">
                  Updated: {format(new Date(podcast.updated), 'MMMM dd, yyyy')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

PodcastList.propTypes = {
  podcasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      seasons: PropTypes.number.isRequired,
      updated: PropTypes.string.isRequired,
      genre_id: PropTypes.number, // Allow genre_id to be undefined
    })
  ).isRequired,
};

export default PodcastList;
