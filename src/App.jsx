import React, { useState, useEffect } from 'react';
import catPic from './assets/cat.png'; 
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [showFinal, setShowFinal] = useState(false);
  const sentence = "Happy Birthday! 🎂";

  useEffect(() => {
    // Controls the transition to the final message
    const timer = setTimeout(() => setShowFinal(true), 6500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-wrapper">
      {/* BACKGROUND DECORATIONS */}
      <div className="cloud cloud1" />
      <div className="cloud cloud2" />
      <div className="snow-floor" />
      
      {/* CONTINUOUS SNOW */}
      {[...Array(35)].map((_, i) => (
        <div key={i} className="snow" style={{ 
          left: `${Math.random() * 100}%`, 
          animationDuration: `${Math.random() * 4 + 6}s`,
          animationDelay: `${Math.random() * -10}s` 
        }} />
      ))}

      <AnimatePresence mode="wait">
        {!showFinal ? (
          <motion.div key="loading" exit={{ opacity: 0 }} className="center-content">
            {/* CAT ANIMATION: Fast -> Slow (Middle) -> Fast */}
            <motion.img 
              src={catPic} 
              className="premium-cat"
              initial={{ x: "-120vw" }}
              animate={{ x: ["-120vw", "0vw", "120vw"] }}
              transition={{ 
                duration: 6, 
                times: [0, 0.6, 1], 
                ease: "easeInOut" 
              }}
            />
            {/* TYPING TEXT */}
            <h1 className="bday-text">
              {sentence.split("").map((char, i) => (
                <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                  {char}
                </motion.span>
              ))}
            </h1>
            <p className="loading-text">Loading your bestie gift...</p>
          </motion.div>
        ) : (
          /* FINAL BIRTHDAY MESSAGE */
          <motion.div key="final" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="final-card">
             <p className="thought-text">a little birthday thought...</p>
             <h1 className="hey-text">Hey Bestie</h1>
             <div className="message-box">
                <p>I wanted to do a tiny something for your birthday, because you mean a lot to me.</p>
                <p className="tap-below">You're the absolute best! ✨</p>
             </div>
             <div className="footer-text">Made with love, lights & warm feelings 💖</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;