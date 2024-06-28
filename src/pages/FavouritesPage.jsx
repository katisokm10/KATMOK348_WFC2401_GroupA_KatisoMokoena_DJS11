import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillThunderbolt, AiFillHeart } from 'react-icons/ai';

const FavouritesPage = () => {
  const [likedEpisodes, setLikedEpisodes] = useState([]);

  useEffect(() => {
    try {
      const storedLikedEpisodes = JSON.parse(localStorage.getItem('likedEpisodes')) || [];
      console.log('Stored Liked Episodes:', storedLikedEpisodes);
      setLikedEpisodes(storedLikedEpisodes);
    } catch (error) {
      console.error('Error loading liked episodes:', error);
      setLikedEpisodes([]);
    }
  }, []);

  const handleUnlikeEpisode = (episodeId) => {
    setLikedEpisodes((prevLikedEpisodes) => {
      const updatedLikedEpisodes = prevLikedEpisodes.filter(ep => ep.id !== episodeId);
      localStorage.setItem('likedEpisodes', JSON.stringify(updatedLikedEpisodes));
      return updatedLikedEpisodes;
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 flex items-center">
        <AiFillThunderbolt className="mr-2 text-blue-500" />
        Favourites
      </h1>
      
      {likedEpisodes.length === 0 ? (
        <p className="text-gray-700">No liked episodes found.</p>
      ) : (
        <ul className="space-y-4">
          {likedEpisodes.map((episode) => (
            <li key={episode.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className="flex flex-col flex-grow mr-4">
                <Link to={`/podcast/${episode.podcastId}`} className="font-bold text-gray-900">{episode.title}</Link>
                <p className="text-gray-700 mb-2">{episode.description}</p>
                <p className="text-gray-600 mb-2">Season: {episode.season}, Episode: {episode.episode}</p>
                <audio controls src={episode.file} className="w-full"></audio>
              </div>
              <button
                onClick={() => handleUnlikeEpisode(episode.id)}
                className="ml-4 p-2"
              >
                <AiFillHeart className="text-red-600 text-2xl" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouritesPage;