import  { useState, useEffect } from 'react';
import PodcastList from '../components/PodcastList';

const HomePage = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://podcast-api.netlify.app');
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Podcast List</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <PodcastList podcasts={podcasts} />
      )}
    </div>
  );
};

export default HomePage;
