import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PodcastPage = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!podcast) {
    return <div>No podcast found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{podcast.title}</h1>
      {podcast.seasons.map((season) => (
        <div key={season.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{season.title}</h2>
            {season.image && (
              <img src={season.image} alt={season.title} className="w-full h-48 object-cover" />
            )}
            {season.episodes.map((episode) => (
              <div key={episode.id} className="my-4">
                <h3 className="text-lg font-semibold">{episode.title}</h3>
                <audio controls src={episode.file}></audio>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PodcastPage;
