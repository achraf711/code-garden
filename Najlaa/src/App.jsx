import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles } from 'lucide-react'

// Define the stages of the animation
const STAGES = {
  INTRO: 'intro',
  ENVELOPE: 'envelope',
  REVEAL: 'reveal'
}

function App() {
  const [stage, setStage] = useState(STAGES.INTRO)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const audioRef = useRef(null)
  
  // Custom Data
  const name = 'Najlaa' 

  // 1. Handle "No" button - Run away logic
  const handleNoButtonHover = () => {
    // Determine screen boundaries to keep button visible
    const maxX = typeof window !== 'undefined' ? window.innerWidth - 200 : 300
    const maxY = typeof window !== 'undefined' ? window.innerHeight - 100 : 500
    
    // Calculate a random new position
    const newX = Math.random() * (maxX - 50) + 50
    const newY = Math.random() * (maxY - 50) + 50
    
    setNoButtonPosition({ x: newX, y: newY })
  }

  // 2. Handle "Yes" button
  const handleYesClick = () => {
    setStage(STAGES.ENVELOPE)
    // Try to play music on first interaction (User click)
    if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err))
    }
  }

  // 3. Handle Envelope Interaction
  const handleEnvelopeClick = () => {
    if (!envelopeOpen) {
      setEnvelopeOpen(true)
      // Wait for animation to finish before changing stage
      setTimeout(() => {
        setStage(STAGES.REVEAL)
      }, 1500)
    }
  }

  // 4. Effect: Trigger Confetti on Reveal
  useEffect(() => {
    if (stage === STAGES.REVEAL) {
      const duration = 3000
      const animationEnd = Date.now() + duration
      const randomInRange = (min, max) => Math.random() * (max - min) + min

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()
        if (timeLeft <= 0) {
          clearInterval(interval)
          return
        }
        const particleCount = 50 * (timeLeft / duration)
        
        // Fire confetti
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: Math.random() - 0.2
          },
          colors: ['#E0F2FE', '#FCE7F3', '#FFB6C1', '#FFC0CB', '#FFFFFF']
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [stage])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-white to-soft-pink flex items-center justify-center p-4 overflow-hidden relative font-sans">
      
      {/* Background Music Player - CORRECTED SECTION */}
      <audio ref={audioRef} autoPlay loop className="hidden">
        <source src="/song.mp3" type="audio/mp3" />
      </audio>

      <AnimatePresence mode="wait">
        
        {/* --- STAGE 1: INTRO --- */}
        {stage === STAGES.INTRO && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
            className="text-center max-w-2xl w-full"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mb-8 flex justify-center"
            >
              {/* Cute Illustration */}
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-red-100 to-pink-300 rounded-full shadow-lg border-4 border-white flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-8xl mb-2"
                    >
                      💕
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-4xl"
                    >
                      ✨
                    </motion.div>
                  </div>
                </div>
                {/* Floating hearts around */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${20 + (i * 15)}%`,
                      left: `${i % 2 === 0 ? '10%' : '85%'}`
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.6, 1, 0.6],
                      scale: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight"
            >
              {name}, ready to make 2026 our best year yet?
            </motion.h1>

            <div className="relative min-h-[200px] flex flex-col sm:flex-row gap-6 justify-center items-start sm:items-center mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                className="px-10 py-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all z-10"
              >
                Yes! Let's Go! 💙
              </motion.button>

              <motion.button
                style={{
                  position: (noButtonPosition.x || noButtonPosition.y) ? 'fixed' : 'relative',
                  left: (noButtonPosition.x || noButtonPosition.y) ? noButtonPosition.x : 'auto',
                  top: (noButtonPosition.x || noButtonPosition.y) ? noButtonPosition.y : 'auto',
                  transition: 'all 0.2s ease-out' // Smooth movement
                }}
                onMouseEnter={handleNoButtonHover}
                onClick={(e) => { e.preventDefault(); handleNoButtonHover(); }}
                className="px-10 py-4 bg-gray-200 text-gray-500 text-xl font-bold rounded-full shadow-md hover:bg-gray-300 transition-colors cursor-pointer z-20"
              >
                No choice 😉
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* --- STAGE 2: ENVELOPE --- */}
        {stage === STAGES.ENVELOPE && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={handleEnvelopeClick}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              {/* Envelope Body */}
              <div className="w-80 h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-2xl border border-blue-200"></div>
              
              {/* Envelope Flap Animation */}
              <motion.div
                className="absolute top-0 left-0 w-full origin-top"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateX: envelopeOpen ? -160 : 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div 
                  className="w-80 h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-t-lg border-2 border-blue-300"
                  style={{ transform: 'perspective(1000px)', backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[130px] border-t-blue-300"></div>
                </div>
              </motion.div>

              {/* Letter Card Sliding Out */}
              <AnimatePresence>
                {envelopeOpen && (
                  <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -180, opacity: 1 }}
                    exit={{ y: -200, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 bg-white rounded-lg shadow-2xl p-6 z-10"
                  >
                    <div className="text-center">
                      <Heart className="w-8 h-8 mx-auto text-pink-400 mb-2" />
                      <p className="text-gray-600 font-cute">Opening...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Seal/Heart */}
              {!envelopeOpen && (
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Heart className="w-12 h-12 text-red-500 fill-red-500" />
                </motion.div>
              )}
            </motion.div>

            {!envelopeOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-xl text-gray-700 font-cute"
              >
                Click the envelope to open 💌
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Stage 3: The Reveal */}
        {stage === STAGES.REVEAL && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl w-full mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
              {/* Letter Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <Sparkles className="w-12 h-12 mx-auto text-pink-400 mb-4" />
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-cute mb-2">
                    To My Beautiful {name} 💕
                  </h2>
                  <p className="text-xl text-gray-600 font-cute">New Year 2026</p>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 font-cute text-lg leading-relaxed">
                  <p className="mb-4">
                    As we stand on the threshold of 2026, I find myself overwhelmed by one specific emotion: gratitude. Looking back at where I started and where I am now, the biggest difference is you. You didn't just walk into my life; you completely reshaped it. You took a world that often felt black and white and painted it with colors I didn't even know existed.
                  </p>
                  <p className="mb-4">
                    It's not just about the big moments or the dates on a calendar. It's about the quiet comfort of knowing you are there. It's the way your voice calms my chaotic thoughts and how your smile has become the only compass I need. You have taught me that love isn't just a feeling—it's a choice we make every day, and choosing you is the easiest thing I have ever done.
                  </p>
                  <p className="mb-4">
                    I don't want 2026 to be just another year. I want it to be a chapter in our story where we grow even closer, laugh even louder, and dream even bigger. I want to be the person who supports you, challenges you, and holds your hand through whatever comes our way.
                  </p>
                  <p className="mb-6 font-semibold text-xl">
                    So, as the new year begins, I have one question that means more to me than anything: Will you continue to be my partner, my best friend, and my Valentine, not just for this year, but for all the years to come?
                  </p>
                </div>

                {/* Hero Image - Polaroid Style */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  className="flex justify-center my-12"
                >
                  <div className="bg-white p-6 pb-8 shadow-2xl" style={{ transform: 'rotate(-2deg)' }}>
                    <img
                      src="/najlaa.jpg"
                      alt="My Favorite View"
                      className="w-full max-w-sm h-auto object-contain border-4 border-white"
                      style={{
                        display: 'block',
                        maxHeight: '600px'
                      }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/500x600/000000/FFFFFF?text=Photo"
                      }}
                    />
                    <p className="text-center mt-4 text-gray-800 font-cute font-semibold text-lg">
                      My Favorite View 🖤
                    </p>
                    <p className="text-center mt-2 text-gray-600" style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.25rem' }}>
                      Even in black and white, you color my world.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center pt-6 border-t border-gray-200"
                >
                  <p className="text-2xl font-bold text-gray-800 font-cute">
                    With all my love, always 💕
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Floating Hearts */}
            {[...Array(20)].map((_, i) => {
              const randomX = Math.random() * 100
              const randomDelay = Math.random() * 2
              const randomDuration = Math.random() * 3 + 5
              return (
                <motion.div
                  key={i}
                  className="fixed pointer-events-none"
                  style={{
                    left: `${randomX}%`,
                    bottom: '-50px'
                  }}
                  initial={{
                    y: 0,
                    opacity: 0
                  }}
                  animate={{
                    y: '-150vh',
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    delay: randomDelay,
                    ease: "linear"
                  }}
                >
                  <Heart className="w-6 h-6 text-pink-300 fill-pink-300" />
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 text-center py-3 z-50">
        <p className="text-gray-400 text-sm">
          Developed by Achraf
        </p>
      </footer>
    </div>
  )
}

export default App