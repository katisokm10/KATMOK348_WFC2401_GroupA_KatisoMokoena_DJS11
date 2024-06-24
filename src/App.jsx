import  'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PodcastPage from './components/PodcastPage';
import GenrePage from './components/GenrePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/podcast/:id" element={<PodcastPage />} />
      <Route path="/genre/:id" element={<GenrePage />} />
    </Routes>
  );
};

export default App;
