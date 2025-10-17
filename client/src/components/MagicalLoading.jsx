import React from 'react';
import { motion } from 'framer-motion';

const MagicalLoading = ({ message = "Weaving magic..." }) => {
  return (
    <div className="loading-container">
      <motion.div
        className="magical-spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ 
          fontSize: '1.2rem', 
          fontStyle: 'italic',
          color: 'var(--primary-gold)'
        }}
      >
        ✨ {message} ✨
      </motion.p>
    </div>
  );
};

export default MagicalLoading;