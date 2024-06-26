import { useState, useEffect } from 'react';
import PodcastList from '../components/PodcastList';
import { AiFillThunderbolt } from 'react-icons/ai';

const HomePage = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('A-Z');

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

  const sortPodcasts = (podcasts, order) => {
    switch (order) {
      case 'A-Z':
        return [...podcasts].sort((a, b) => a.title.localeCompare(b.title));
      case 'Z-A':
        return [...podcasts].sort((a, b) => b.title.localeCompare(a.title));
      case 'Most Recent':
        return [...podcasts].sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case 'Oldest':
        return [...podcasts].sort((a, b) => new Date(a.updated) - new Date(b.updated));
      default:
        return podcasts;
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortedPodcasts = sortPodcasts(podcasts, sortOrder);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-black">
        <AiFillThunderbolt className="mr-2 text-blue-300" />
        <span>Discover more Podcasts</span>
      </h2>
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => handleSortChange('A-Z')}
          className={`px-4 py-2 rounded-full border ${sortOrder === 'A-Z' ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'}`}
        >
          A-Z
        </button>
        <button
          onClick={() => handleSortChange('Z-A')}
          className={`px-4 py-2 rounded-full border ${sortOrder === 'Z-A' ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'}`}
        >
          Z-A
        </button>
        <button
          onClick={() => handleSortChange('Most Recent')}
          className={`px-4 py-2 rounded-full border ${sortOrder === 'Most Recent' ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'}`}
        >
          Most Recent
        </button>
        <button
          onClick={() => handleSortChange('Oldest')}
          className={`px-4 py-2 rounded-full border ${sortOrder === 'Oldest' ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'}`}
        >
          Oldest
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-300"></div>
        </div>
      ) : (
        <PodcastList podcasts={sortedPodcasts} />
      )}
    </div>
  );
};

export default HomePage;
