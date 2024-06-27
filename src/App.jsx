import 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PodcastPage from './components/PodcastPage';
import GenrePage from './components/GenrePage';
import FavouritesPage from './pages/FavouritesPage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Login page */}
        <Route path="/home" element={<HomePage />} /> {/* Homepage */}
        <Route path="/podcast/:id" element={<PodcastPage />} />
        <Route path="/genre/:id" element={<GenrePage />} />
        <Route path="/favourites" element={<FavouritesPage />} /> {/* Favourites page */}
      </Routes>
    </>
  );
};

export default App;
