import 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PodcastPage from './components/PodcastPage';
import GenrePage from './components/GenrePage';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/podcast/:id" element={<PodcastPage />} />
        <Route path="/genre/:id" element={<GenrePage />} />
      </Routes>
    </>
  );
};

export default App;
