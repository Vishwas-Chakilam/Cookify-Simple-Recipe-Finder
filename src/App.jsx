import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';
import NutritionPage from './pages/NutritionPage';
import ToolsPage from './pages/ToolsPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
export default App;