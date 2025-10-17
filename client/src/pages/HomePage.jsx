import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Scroll, Sparkles } from 'lucide-react';
import axios from 'axios';

function HomePage() {
  const [message, setMessage] = useState('');
  const [linkId, setLinkId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCreateLink = async () => {
    if (!message.trim()) {
      setError('Please enter a secret message first!');
      return;
    }

    setError(null);
    setLinkId(null);
    setIsLoading(true);

    try {
      const response = await axios.post('${import.meta.env.VITE_API_URL}/api/secrets', {
        message: message,
      });

      setLinkId(response.data.id);
      
    } catch (err) {
      console.error(err);
      setError('The magic failed! Please try casting again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getFullLink = () => {
    return `${window.location.origin}/secret/${linkId}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFullLink());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="magical-card">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 style={{ 
            fontFamily: 'Cinzel, serif', 
            fontSize: '2rem', 
            textAlign: 'center', 
            marginBottom: '1.5rem',
            color: 'var(--primary-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <Scroll size={32} />
            Craft Your Secret Scroll
            <Scroll size={32} />
          </h2>
          
          <motion.textarea
            className="magical-textarea"
            rows="6"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Whisper your secrets here... They shall vanish like morning mist after one glimpse..."
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          
          <div style={{ textAlign: 'center' }}>
            <motion.button
              className="magical-button"
              onClick={handleCreateLink}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
            >
              <Sparkles size={20} />
              {isLoading ? 'Weaving Magic...' : 'Enchant Message'}
              <Sparkles size={20} />
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {linkId && (
            <motion.div
              className="link-container"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 style={{ 
                fontFamily: 'Cinzel, serif',
                color: 'var(--primary-gold)',
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                🎭 Your Enchanted Link is Ready! 🎭
              </h3>
              <p style={{ 
                textAlign: 'center', 
                marginBottom: '1rem',
                fontStyle: 'italic',
                color: 'var(--ink-black)'
              }}>
                ⚠️ This magical link will self-destruct after one viewing ⚠️
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  className="link-input"
                  type="text"
                  value={getFullLink()}
                  readOnly
                  style={{ flex: 1 }}
                />
                <motion.button
                  className="magical-button"
                  onClick={handleCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem'
                  }}
                >
                  <Copy size={16} />
                  {copied ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
              
              {copied && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  ✨ Link copied to your spellbook! ✨
                </motion.div>
              )}
            </motion.div>
          )}

          {error && (
            <motion.div
              className="error-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h3>🔮 Spell Failed! 🔮</h3>
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default HomePage;