import 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const PodcastList = ({ podcasts }) => {
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + '...';
  };

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
            <p className="text-gray-700 mb-4">
              {truncateDescription(podcast.description, 100)}
            </p>
            <div className="flex flex-col">
              <span className="text-gray-600 mb-2">Seasons: {podcast.seasons}</span>
              <span className="text-gray-600">Updated: {format(new Date(podcast.updated), 'MMMM dd, yyyy')}</span>
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
