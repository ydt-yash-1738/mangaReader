import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MangaDetail from './pages/MangaDetail';
import ChapterReader from './pages/ChapterReader';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manga/:id" element={<MangaDetail />} />
        <Route path="/chapter/:id" element={<ChapterReader />} />
      </Routes>
    </Router>
  );
}