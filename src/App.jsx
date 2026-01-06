import React, { useState, useEffect } from 'react';
import catPic from './assets/cat.png'; 
import cozyCat from './assets/cozy.png'; 
import winkCat from './assets/wink.png'; 
import kittyPlane from './assets/kitty.png'; 
import cakeGif from './assets/cake.gif';
import blownGif from './assets/blown.gif';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const BackgroundParticles = () => {
  const particleColors = ['#ff8fa3', '#ffd6a5', '#9bf6ff', '#ffffff'];
  return (
    <div className="particle-layer">
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 6 + 2; 
        return (
          <div 
            key={i} 
            className="colourful-particle" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: particleColors[i % particleColors.length],
              animationDuration: `${Math.random() * 5 + 7}s`,
              animationDelay: `${Math.random() * -10}s`,
              opacity: Math.random() * 0.5 + 0.2 
            }} 
          />
        );
      })}
    </div>
  );
};

function App() {
  const [step, setStep] = useState('loading'); 
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isBlown, setIsBlown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStep('greeting'), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleFlyAway = () => {
    setStep('flying');
    setTimeout(() => setStep('songs'), 3200); 
  };

  const smoothTransition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] };

  const getFloatAnim = (delay) => ({
    y: [0, -8, 0],
    transition: {
      duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: delay 
    }
  });

  return (
    <div className="app-wrapper">
      {step !== 'loading' && step !== 'cake' && <BackgroundParticles />}

      <AnimatePresence mode="wait">
        {step === 'loading' && (
          <motion.div key="loading" exit={{ opacity: 0 }} transition={smoothTransition} className="center-content-wrapper">
            <div className="snow-floor" />
            {[...Array(20)].map((_, i) => (
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
          <motion.div key="greeting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={smoothTransition} className="final-screen-container">
            <div className="content-wrapper">
              <p className="mini-title">a little birthday thought...</p>
              <h1 className="main-title">Hey Kid!</h1>
              <div className="white-message-box">
                <div className="box-dots"><span className="dot pink"></span><span className="dot yellow"></span><span className="dot cyan"></span></div>
                <motion.img src={cozyCat} className="sticker-cat-left" animate={getFloatAnim(0)} />
                <motion.img src={winkCat} className="sticker-cat-right" animate={getFloatAnim(1.5)} />
                <p>I wanted to do a tiny something for your birthday, because you mean a lot to me.</p>
                <p className="tap-text">Tap below, okay? 👋</p>
                <button className="gift-button" onClick={() => setStep('letter')}>See What's Inside <span>→</span></button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'letter' && (
          <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={smoothTransition} className="final-screen-container">
            <div className="content-wrapper letter-screen">
              
              <AnimatePresence>
                {isEnvelopeOpen && (
                  <motion.div 
                    className="big-letter-paper"
                    initial={{ y: 150, opacity: 0 }}
                    animate={{ y: -60, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="paper-content">
                      <p className="letter-handwritten">Dear Leslie...</p>
                      <p className="letter-body">
                        I wanted to make something special for you. You're an amazing friend and you deserve the best year ahead! 
                        I hope you like this little surprise I built for your big day.
                      </p>
                    </div>
                    <button className="fly-button" onClick={handleFlyAway}>
                      Blast Off! 🚀
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div 
                className={`env-container ${isEnvelopeOpen ? 'env-opened' : ''}`}
                onClick={() => !isEnvelopeOpen && setIsEnvelopeOpen(true)}
                animate={isEnvelopeOpen ? { x: "35vw", y: "30vh", scale: 0.5 } : { x: 0, y: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div className="env-back">
                  <div className="env-flap"></div>
                  <div className="env-front"></div>
                </div>
              </motion.div>

              {!isEnvelopeOpen && <p className="tap-hint">Tap the envelope to open 💌</p>}
            </div>
          </motion.div>
        )}

        {step === 'flying' && (
          <motion.div key="flying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="plane-scene">
             <div className="star-field">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="star" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
              ))}
            </div>
            <div className="plane-container">
              <motion.img 
                src={kittyPlane} 
                className="kitty-plane-img"
                initial={{ x: "-100vw", y: "10vh", rotate: 10 }} 
                animate={{ x: "100vw", y: "-10vh", rotate: -10 }} 
                transition={{ duration: 3.2, ease: "easeInOut" }} 
              />
            </div>
          </motion.div>
        )}

        {step === 'songs' && (
          <motion.div key="songs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={smoothTransition} className="final-screen-container">
            <div className="content-wrapper scrollable-content">
              <h2 className="song-header">Songs for You 🎵</h2>
              <div className="song-card"><h3>Treehouse</h3><p>Your Favorite 🏠</p></div>
              <div className="hard-work-note">
                <p>I hope u like it 💖</p>
                <button className="gift-button" onClick={() => setStep('cake')} style={{marginTop: '20px'}}>Continue →</button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'cake' && (
          <motion.div 
            key="cake" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={smoothTransition} 
            className="cake-screen"
          >
            <div className="stars-background">
              {[...Array(80)].map((_, i) => (
                <div 
                  key={i} 
                  className="night-star" 
                  style={{ 
                    left: `${Math.random() * 100}%`, 
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 2 + 0.5}px`,
                    height: `${Math.random() * 2 + 0.5}px`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `2s`
                  }} 
                />
              ))}
            </div>
            
            <div className="cake-scrollable-wrapper">
              <div className="stickers-cards-section">
                <motion.div 
                  className="sticker-card sticker-card-left"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <motion.img 
                    src={cozyCat} 
                    className="sticker-card-img"
                    animate={getFloatAnim(0)}
                  />
                  <div className="sticker-card-text">
                    <p className="sticker-label">Sweet memories with you 💕</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="sticker-card sticker-card-right"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="sticker-card-text">
                    <p className="sticker-label">Your fun spirit shines ✨</p>
                  </div>
                  <motion.img 
                    src={winkCat} 
                    className="sticker-card-img"
                    animate={getFloatAnim(1.2)}
                  />
                </motion.div>

                <motion.div 
                  className="sticker-card sticker-card-left"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <motion.img 
                    src={catPic} 
                    className="sticker-card-img"
                    animate={getFloatAnim(0.6)}
                  />
                  <div className="sticker-card-text">
                    <p className="sticker-label">Here's to more laughter 😄</p>
                  </div>
                </motion.div>
              </div>

              <div className="cake-section">
                <motion.h1 
                  className="birthday-handwritten"
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  Happy Birthday!
                </motion.h1>

                <motion.div 
                  className="cake-container"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  onClick={() => setIsBlown(true)}
                >
                  <img 
                    src={isBlown ? blownGif : cakeGif} 
                    alt="Birthday Cake" 
                    className="cake-gif"
                  />
                </motion.div>

                {!isBlown && (
                  <motion.p 
                    className="blow-instruction"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    Tap to blow the candle 🕯️
                  </motion.p>
                )}

                {isBlown && (
                  <motion.p 
                    className="blown-message"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    🎉 Make a wish! 🎉
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;