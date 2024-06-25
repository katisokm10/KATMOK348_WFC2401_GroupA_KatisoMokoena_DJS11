import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const PodcastPage = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [likedEpisodes, setLikedEpisodes] = useState(() => {
    return JSON.parse(localStorage.getItem('likedEpisodes')) || [];
  });

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPodcast(data);
      } catch (error) {
        console.error('Error fetching podcast:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcast();
  }, [id]);

  const handleSeasonChange = (event) => {
    setSelectedSeason(Number(event.target.value));
  };

  const handleLikeEpisode = (episodeId) => {
    if (likedEpisodes.includes(episodeId)) {
      setLikedEpisodes(likedEpisodes.filter(id => id !== episodeId));
    } else {
      setLikedEpisodes([...likedEpisodes, episodeId]);
    }
  };

  useEffect(() => {
    localStorage.setItem('likedEpisodes', JSON.stringify(likedEpisodes));
  }, [likedEpisodes]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (!podcast) {
    return <div>No podcast found.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{podcast.title}</h1>
      
      <div className="flex flex-col md:flex-row mb-8">
        <img src={podcast.image} alt="Podcast cover" className="h-48 w-48 md:h-64 md:w-64 object-cover mr-0 md:mr-8 mb-4 md:mb-0 rounded-lg border border-gray-300" />
        <div className="flex-1">
          <p className="mb-6 text-gray-700">{podcast.description}</p>
          {podcast.genres && podcast.genres.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Genres</h3>
              <div className="text-gray-600">
                {podcast.genres.filter(genre => genre.toLowerCase() !== 'all').join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {podcast.seasons && podcast.seasons.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Seasons</h3>
          <div className="flex items-center">
            <select
              value={selectedSeason}
              onChange={handleSeasonChange}
              className="border border-gray-300 rounded p-2"
            >
              {podcast.seasons.map((season, index) => (
                <option key={index} value={index}>
                  Season {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {podcast.seasons && podcast.seasons.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Episodes</h3>
          <ul className="space-y-4">
            {podcast.seasons[selectedSeason].episodes.map((episode) => (
              <li key={episode.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex flex-col flex-grow mr-4">
                  <div className="font-bold text-gray-900">{episode.title}</div>
                  <p className="text-gray-700 mb-2">{episode.description}</p>
                  <audio controls src={episode.file} className="w-full"></audio>
                </div>
                <button
                  onClick={() => handleLikeEpisode(episode.id)}
                  className="ml-4 p-2"
                >
                  {likedEpisodes.includes(episode.id) ? (
                    <AiFillHeart className="text-red-600 text-2xl" />
                  ) : (
                    <AiOutlineHeart className="text-gray-600 text-2xl" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PodcastPage;
