import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FavouritesPage = () => {
  const [likedEpisodes, setLikedEpisodes] = useState([]);

  useEffect(() => {
    const storedLikedEpisodes = JSON.parse(localStorage.getItem('likedEpisodes')) || [];
    console.log('Liked Episodes:', storedLikedEpisodes);
    setLikedEpisodes(storedLikedEpisodes);
  }, []);

  if (likedEpisodes.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Favourites</h1>
        <p className="text-gray-700">No liked episodes found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Favourites</h1>
      <ul className="space-y-4">
        {likedEpisodes.map((episode) => (
          <li key={episode.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div className="flex flex-col flex-grow mr-4">
              <Link to={`/podcast/${episode.podcastId}`} className="font-bold text-gray-900">{episode.title}</Link>
              <p className="text-gray-700 mb-2">{episode.description}</p>
              <audio controls src={episode.file} className="w-full"></audio>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPage;
