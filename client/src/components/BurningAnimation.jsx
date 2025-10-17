import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BurningAnimation = ({ onComplete }) => {
  const [stage, setStage] = useState('burning'); // burning -> ashes -> complete

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('ashes'), 2000);
    const timer2 = setTimeout(() => {
      setStage('complete');
      onComplete && onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="burning-container">
      <AnimatePresence mode="wait">
        {stage === 'burning' && (
          <motion.div
            key="burning"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flame-container"
          >
            <div className="flame"></div>
            <motion.div
              className="burning-text"
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: [20, 0, 0, -20]
              }}
              transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
            >
              🔥 Secret is burning... 🔥
            </motion.div>
          </motion.div>
        )}

        {stage === 'ashes' && (
          <motion.div
            key="ashes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="ashes-container"
          >
            <motion.div
              animate={{ 
                opacity: [0, 1, 0.5],
                scale: [0.8, 1, 1.2]
              }}
              transition={{ duration: 2 }}
              style={{
                fontSize: '3rem',
                textAlign: 'center',
                color: '#666'
              }}
            >
              💨
            </motion.div>
            <motion.p
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: 0.5 }}
              style={{
                textAlign: 'center',
                color: '#888',
                fontStyle: 'italic',
                marginTop: '1rem'
              }}
            >
              Reduced to ashes...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BurningAnimation;