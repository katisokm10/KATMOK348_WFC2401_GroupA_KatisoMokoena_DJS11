import 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PodcastList = ({ podcasts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {podcasts.map((podcast) => (
        <Link to={`/podcast/${podcast.id}`} key={podcast.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {podcast.image ? (
            <img src={podcast.image} alt={podcast.title} className="w-full h-48 object-cover" />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{podcast.title}</h2>
            <p className="text-gray-700 mb-4">{podcast.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Seasons: {podcast.seasons}</span>
              <span className="text-gray-600">Updated: {podcast.updated}</span>
            </div>
          </div>
        </Link>
      ))}
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
    })
  ).isRequired,
};

export default PodcastList;
