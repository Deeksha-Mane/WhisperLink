import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Flame, Home } from 'lucide-react';
import axios from 'axios';
import MagicalLoading from '../components/MagicalLoading';
import BurningAnimation from '../components/BurningAnimation';

function SecretViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBurning, setShowBurning] = useState(false);
  const [secretRevealed, setSecretRevealed] = useState(false);

  useEffect(() => {
    const fetchSecret = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/secrets/${id}`);
        setMessage(response.data.message);
        
        // Show the secret first, then trigger burning animation
        setTimeout(() => {
          setSecretRevealed(true);
          setTimeout(() => setShowBurning(true), 3000); // Show secret for 3 seconds
        }, 500);

      } catch (err) {
        console.error(err);
        setError('This secret has already been consumed by the flames or never existed in the realm of magic! 🔥');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSecret();
  }, [id]);

  const handleBurningComplete = () => {
    setShowBurning(false);
    // Could redirect to home or show a "create new secret" message
  };

  const renderContent = () => {
    if (isLoading) {
      return <MagicalLoading message="Unveiling your secret..." />;
    }
    
    if (error) {
      return (
        <motion.div
          className="magical-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="error-container">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              <h2>🏺 The Vessel is Empty! 🏺</h2>
            </motion.div>
            <p>{error}</p>
            <motion.button
              className="magical-button"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Home size={20} />
              Return to Sanctuary
            </motion.button>
          </div>
        </motion.div>
      );
    }

    if (showBurning) {
      return (
        <motion.div
          className="magical-card"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <BurningAnimation onComplete={handleBurningComplete} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
            style={{ textAlign: 'center', marginTop: '2rem' }}
          >
            <p style={{ 
              fontSize: '1.2rem', 
              fontStyle: 'italic',
              color: 'var(--primary-gold)',
              marginBottom: '1.5rem'
            }}>
              The secret has returned to the ethereal realm...
            </p>
            <motion.button
              className="magical-button"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
            >
              <Home size={20} />
              Create Another Secret
            </motion.button>
          </motion.div>
        </motion.div>
      );
    }

    return (
      <motion.div
        className="magical-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: 'center' }}
        >
          <motion.h2
            style={{ 
              fontFamily: 'Cinzel, serif',
              fontSize: '2rem',
              color: 'var(--primary-gold)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            animate={{ 
              textShadow: [
                "0 0 20px rgba(212, 175, 55, 0.4)",
                "0 0 40px rgba(212, 175, 55, 0.8)",
                "0 0 20px rgba(212, 175, 55, 0.4)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Eye size={32} />
            Your Secret Scroll
            <Eye size={32} />
          </motion.h2>
          
          <motion.div
            className="secret-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.p
              style={{ 
                fontSize: '1.3rem',
                lineHeight: '1.8',
                fontFamily: 'Crimson Text, serif'
              }}
              animate={secretRevealed ? {} : { opacity: [0, 1] }}
              transition={{ duration: 1 }}
            >
              {message}
            </motion.p>
          </motion.div>

          {secretRevealed && !showBurning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              style={{ 
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(255, 107, 53, 0.1)',
                border: '2px solid var(--flame-orange)',
                borderRadius: '15px',
                color: 'var(--flame-orange)'
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Flame size={24} style={{ margin: '0 auto', display: 'block' }} />
              </motion.div>
              <p style={{ 
                fontStyle: 'italic',
                marginTop: '0.5rem',
                fontSize: '1.1rem'
              }}>
                This message will self-destruct in moments...
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="secret-container"
    >
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </motion.div>
  );
}

export default SecretViewPage;