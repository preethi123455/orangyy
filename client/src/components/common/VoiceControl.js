import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      initializeSpeechRecognition();
    } else {
      console.warn('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const initializeSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setIsProcessing(false);
    };

    recognitionRef.current.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(interimTranscript || finalTranscript);
      
      if (finalTranscript) {
        processVoiceCommand(finalTranscript.toLowerCase().trim());
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setIsProcessing(false);
      
      if (event.error === 'not-allowed') {
        toast.error('Microphone access denied. Please allow microphone access.');
      } else if (event.error === 'no-speech') {
        toast.error('No speech detected. Please try again.');
      } else {
        toast.error('Speech recognition error. Please try again.');
      }
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      setIsProcessing(false);
    };
  };

  const processVoiceCommand = async (command) => {
    setIsProcessing(true);
    
    // Navigation commands
    if (command.includes('go to') || command.includes('navigate to') || command.includes('show me')) {
      if (command.includes('home') || command.includes('main page')) {
        navigate('/');
        speakResponse('Navigating to home page');
      } else if (command.includes('products') || command.includes('shop') || command.includes('store')) {
        navigate('/products');
        speakResponse('Taking you to our products page');
      } else if (command.includes('cart') || command.includes('shopping cart')) {
        navigate('/cart');
        speakResponse('Opening your shopping cart');
      } else if (command.includes('profile') || command.includes('account')) {
        if (user) {
          navigate('/profile');
          speakResponse('Opening your profile');
        } else {
          speakResponse('Please log in to view your profile');
        }
      } else if (command.includes('about')) {
        navigate('/about');
        speakResponse('Taking you to our about page');
      } else if (command.includes('contact')) {
        navigate('/contact');
        speakResponse('Opening contact information');
      }
    }
    
    // Cart commands
    else if (command.includes('add to cart') || command.includes('add') || command.includes('buy')) {
      if (command.includes('orange juice') || command.includes('juice')) {
        // Find a product to add (for demo purposes, add the first product)
        const sampleProduct = {
          _id: '1',
          name: 'Fresh Valencia Orange Juice',
          price: 8.99,
          image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop',
          category: 'fresh',
          size: '500ml'
        };
        
        if (user) {
          addToCart(sampleProduct, 1);
          speakResponse('Added Fresh Valencia Orange Juice to your cart');
        } else {
          speakResponse('Please log in to add items to your cart');
        }
      } else {
        speakResponse('I can help you add orange juice to your cart. Please specify which product you want.');
      }
    }
    
    // Cart management commands
    else if (command.includes('clear cart') || command.includes('empty cart')) {
      if (user) {
        // Clear cart functionality would go here
        speakResponse('Your cart has been cleared');
      } else {
        speakResponse('Please log in to manage your cart');
      }
    }
    
    else if (command.includes('checkout') || command.includes('proceed to checkout')) {
      if (user && cart.length > 0) {
        navigate('/checkout');
        speakResponse('Proceeding to checkout');
      } else if (!user) {
        speakResponse('Please log in to proceed to checkout');
      } else {
        speakResponse('Your cart is empty. Please add some items first');
      }
    }
    
    // Search commands
    else if (command.includes('search for') || command.includes('find')) {
      const searchTerm = command.replace(/search for|find/gi, '').trim();
      if (searchTerm) {
        navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
        speakResponse(`Searching for ${searchTerm}`);
      }
    }
    
    // Help commands
    else if (command.includes('help') || command.includes('what can you do')) {
      speakResponse('I can help you navigate the website, add products to cart, search for items, and manage your shopping. Try saying "go to products" or "add orange juice to cart"');
    }
    
    // Greeting commands
    else if (command.includes('hello') || command.includes('hi') || command.includes('hey')) {
      speakResponse('Hello! How can I help you with your orange juice shopping today?');
    }
    
    // Stop listening
    else if (command.includes('stop listening') || command.includes('stop voice') || command.includes('turn off voice')) {
      stopListening();
      speakResponse('Voice control turned off');
    }
    
    else {
      speakResponse('I didn\'t understand that command. Try saying "help" to see what I can do');
    }
    
    setTimeout(() => {
      setIsProcessing(false);
      setTranscript('');
    }, 2000);
  };

  const speakResponse = (text) => {
    if (isMuted) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        toast.success('Voice control activated. Start speaking!');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast.error('Failed to start voice control');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setIsProcessing(false);
      setTranscript('');
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      toast.success('Voice responses enabled');
    } else {
      toast.success('Voice responses muted');
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="voice-control">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={isListening ? stopListening : startListening}
        className={`voice-btn ${isListening ? 'listening' : ''} ${isProcessing ? 'processing' : ''}`}
        title={isListening ? 'Stop listening' : 'Start voice control'}
      >
        {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className={`mute-btn ${isMuted ? 'muted' : ''}`}
        title={isMuted ? 'Enable voice responses' : 'Mute voice responses'}
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </motion.button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="voice-status"
          >
            <div className="listening-indicator">
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay-1"></div>
              <div className="pulse-ring delay-2"></div>
            </div>
            <p className="status-text">
              {isProcessing ? 'Processing...' : 'Listening...'}
            </p>
            {transcript && (
              <p className="transcript">
                "{transcript}"
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .voice-control {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        .voice-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .voice-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(255, 107, 53, 0.4);
        }

        .voice-btn.listening {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          animation: pulse 1.5s infinite;
        }

        .voice-btn.processing {
          background: linear-gradient(135deg, #f39c12, #e67e22);
        }

        .mute-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--primary-orange);
          background: white;
          color: var(--primary-orange);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .mute-btn:hover {
          background: var(--primary-orange);
          color: white;
        }

        .mute-btn.muted {
          background: var(--text-light);
          border-color: var(--text-light);
          color: white;
        }

        .voice-status {
          position: absolute;
          bottom: 80px;
          right: 0;
          background: white;
          padding: 1.5rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          min-width: 250px;
          text-align: center;
        }

        .listening-indicator {
          position: relative;
          width: 60px;
          height: 60px;
          margin: 0 auto 1rem;
        }

        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          border: 2px solid var(--primary-orange);
          border-radius: 50%;
          animation: pulse-ring 1.5s infinite;
        }

        .pulse-ring.delay-1 {
          animation-delay: 0.5s;
        }

        .pulse-ring.delay-2 {
          animation-delay: 1s;
        }

        .status-text {
          font-size: var(--font-lg);
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 0.5rem;
        }

        .transcript {
          font-size: var(--font-base);
          color: var(--text-light);
          font-style: italic;
          margin: 0;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .voice-control {
            bottom: 1rem;
            right: 1rem;
          }

          .voice-btn {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }

          .mute-btn {
            width: 35px;
            height: 35px;
            font-size: 0.9rem;
          }

          .voice-status {
            bottom: 70px;
            right: -50px;
            min-width: 200px;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VoiceControl;
