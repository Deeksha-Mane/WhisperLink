import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import SecretViewPage from './pages/SecretViewPage';
import MagicalParticles from './components/MagicalParticles';
import './styles/magical.css';

function App() {
  return (
    <div className="app-container">
      <MagicalParticles />
      
      <motion.header 
        className="app-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1 
          className="app-title"
          animate={{ 
            textShadow: [
              "0 0 30px rgba(212, 175, 55, 0.4)",
              "0 0 50px rgba(212, 175, 55, 0.8)",
              "0 0 30px rgba(212, 175, 55, 0.4)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          WhisperLink
        </motion.h1>
        <p className="app-subtitle">
          ✨ Secrets that vanish like magic ✨
        </p>
      </motion.header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/secret/:id" element={<SecretViewPage />} />
      </Routes>
    </div>
  );
}

export default App;