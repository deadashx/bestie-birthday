import React, { useState, useEffect } from 'react';
import catPic from './assets/cat.png'; 
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [step, setStep] = useState('loading'); // loading, greeting, letter, flying, songs
  const sentence = "Happy Birthday! 🎂";

  useEffect(() => {
    const timer = setTimeout(() => setStep('greeting'), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleFlyAway = () => {
    setStep('flying');
    setTimeout(() => setStep('songs'), 2500); // Wait for flight animation to finish
  };

  return (
    <div className="app-wrapper">
      <AnimatePresence mode="popLayout">
        {step === 'loading' && (
          <motion.div key="loading" exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className="center-content-wrapper">
            <div className="cloud cloud1" /><div className="cloud cloud2" /><div className="snow-floor" />
            {[...Array(35)].map((_, i) => (
              <div key={i} className="snow" style={{ 
                left: `${Math.random() * 100}%`, 
                animationDuration: `${Math.random() * 4 + 6}s`,
                animationDelay: `${Math.random() * -10}s` 
              }} />
            ))}
            <div className="center-content">
              <motion.img src={catPic} className="premium-cat" initial={{ x: "-120vw" }} animate={{ x: ["-120vw", "0vw", "120vw"] }} transition={{ duration: 5, ease: "easeInOut" }} />
              <h1 className="bday-text">Happy Birthday! 🎂</h1>
              <div className="leslie-dedication"><p className="leslie-handwritten">For Leslie 07 Feb 2026</p></div>
            </div>
          </motion.div>
        )}

        {step === 'greeting' && (
          <motion.div key="greeting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="final-screen-container">
            <div className="content-wrapper">
              <p className="mini-title">a little birthday thought...</p>
              <h1 className="main-title">Hey Kid!</h1>
              <div className="white-message-box">
                <div className="box-dots"><span className="dot pink"></span><span className="dot yellow"></span><span className="dot cyan"></span></div>
                <p>I wanted to do a tiny something for your birthday, because you mean a lot to me.</p>
                <p className="tap-text">Tap below, okay? 👋</p>
                <button className="gift-button" onClick={() => setStep('letter')}>See What's Inside <span>→</span></button>
              </div>
              <p className="footer-credit">Built this instead of doing my actual work. Enjoy! ✨</p>
            </div>
          </motion.div>
        )}

        {step === 'letter' && (
          <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="final-screen-container">
            <div className="content-wrapper">
              <p className="mini-title">Wrapped straight from my heart</p>
              <div className="letter-paper">
                <div className="letter-content">
                  <p className="letter-text">
                    Dear Leslie...
                  </p>
                </div>
                <button className="fly-button" onClick={handleFlyAway}>Send to the stars ✈️</button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'flying' && (
          <motion.div key="flying" className="plane-scene">
            <div className="star-field">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="star"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() * 2 }}
                  style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                />
              ))}
            </div>
            <motion.div 
              className="paper-plane"
              initial={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
              animate={{ 
                scale: [1, 0.7, 0.2], 
                rotate: [0, -15, -45], 
                x: [0, 100, 1000], 
                y: [0, -50, -600], 
                opacity: [1, 1, 0] 
              }}
              transition={{ duration: 2.5, ease: "easeInOut", times: [0, 0.3, 1] }}
            >
              ✈️
            </motion.div>
          </motion.div>
        )}

        {step === 'songs' && (
          <motion.div key="songs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="final-screen-container">
            <div className="content-wrapper scrollable-content">
              <p className="mini-title">Soft, warm & full of feeling</p>
              <h2 className="song-header">Songs for You 🎵</h2>
              
              <div className="song-card">
                <div className="song-info">
                  <h3>Treehouse</h3>
                  <p>Your Favorite 🏠</p>
                </div>
              </div>

              <div className="song-card">
                <div className="song-info">
                  <h3>For a Reason</h3>
                  <p>Idk why, but I felt like I should add it... 🎶</p>
                </div>
              </div>

              <div className="hard-work-note">
                <p>I made it all by myself! It was quite hard because I’ve never made a website before so I hope u like it 💖</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
