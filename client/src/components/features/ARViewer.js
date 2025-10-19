import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCamera, FaTimes, FaExpand, FaCompress } from 'react-icons/fa';
import { useProducts } from '../../contexts/ProductContext';
import toast from 'react-hot-toast';

const ARViewer = ({ product, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [arMode, setArMode] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setArMode(true);
      toast.success('AR mode activated! Point your camera at a flat surface');
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Camera access denied. Please allow camera permission.');
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setArMode(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ar-${product.name.replace(/\s+/g, '-').toLowerCase()}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Photo captured and downloaded!');
      }, 'image/jpeg', 0.9);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="ar-viewer-overlay"
    >
      <div className="ar-viewer-container">
        <div className="ar-header">
          <h3>AR Product Viewer</h3>
          <div className="ar-controls">
            <button
              onClick={toggleFullscreen}
              className="control-btn"
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
            <button
              onClick={onClose}
              className="control-btn close-btn"
              title="Close AR viewer"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="ar-content">
          {!arMode ? (
            <div className="ar-preview">
              <div className="product-preview">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <div className="price">${product.price}</div>
                </div>
              </div>
              
              <div className="ar-instructions">
                <h4>Try AR Experience</h4>
                <p>See how this orange juice would look in your space using augmented reality!</p>
                <ul>
                  <li>Point your camera at a flat surface</li>
                  <li>Tap to place the product</li>
                  <li>Move around to view from different angles</li>
                  <li>Capture photos to share</li>
                </ul>
              </div>

              <button
                onClick={startCamera}
                disabled={isLoading}
                className="ar-start-btn"
              >
                {isLoading ? 'Starting Camera...' : 'Start AR Experience'}
                <FaCamera />
              </button>
            </div>
          ) : (
            <div className="ar-camera-view">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="camera-video"
              />
              
              <div className="ar-overlay">
                <div className="ar-product-3d">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="ar-product-image"
                  />
                  <div className="ar-product-info">
                    <h5>{product.name}</h5>
                    <p>${product.price}</p>
                  </div>
                </div>
              </div>

              <div className="ar-camera-controls">
                <button
                  onClick={capturePhoto}
                  className="capture-btn"
                  title="Capture photo"
                >
                  <FaCamera />
                </button>
                <button
                  onClick={stopCamera}
                  className="stop-btn"
                >
                  Stop AR
                </button>
              </div>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      <style jsx>{`
        .ar-viewer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .ar-viewer-container {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .ar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
          color: white;
        }

        .ar-header h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .ar-controls {
          display: flex;
          gap: 1rem;
        }

        .control-btn {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .close-btn {
          background: rgba(231, 76, 60, 0.8);
        }

        .close-btn:hover {
          background: rgba(231, 76, 60, 1);
        }

        .ar-content {
          padding: 2rem;
          max-height: calc(90vh - 120px);
          overflow-y: auto;
        }

        .ar-preview {
          text-align: center;
        }

        .product-preview {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          align-items: center;
        }

        .product-image {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .product-info h4 {
          margin: 0 0 1rem 0;
          color: var(--text-dark);
          font-size: 1.5rem;
        }

        .product-info p {
          color: var(--text-light);
          margin-bottom: 1rem;
        }

        .price {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--primary-orange);
        }

        .ar-instructions {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 15px;
          margin-bottom: 2rem;
          text-align: left;
        }

        .ar-instructions h4 {
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .ar-instructions ul {
          list-style: none;
          padding: 0;
        }

        .ar-instructions li {
          padding: 0.5rem 0;
          color: var(--text-light);
          position: relative;
          padding-left: 1.5rem;
        }

        .ar-instructions li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--primary-orange);
          font-weight: bold;
        }

        .ar-start-btn {
          background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 auto;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
        }

        .ar-start-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(255, 107, 53, 0.4);
        }

        .ar-start-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .ar-camera-view {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 15px;
          overflow: hidden;
        }

        .camera-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .ar-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .ar-product-3d {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          background: rgba(255, 255, 255, 0.9);
          padding: 1rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .ar-product-image {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 0.5rem;
        }

        .ar-product-info h5 {
          margin: 0;
          color: var(--text-dark);
          font-size: 1rem;
        }

        .ar-product-info p {
          margin: 0;
          color: var(--primary-orange);
          font-weight: 600;
        }

        .ar-camera-controls {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
        }

        .capture-btn, .stop-btn {
          width: 50px;
          height: 50px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .capture-btn {
          background: white;
          color: var(--primary-orange);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .capture-btn:hover {
          transform: scale(1.1);
        }

        .stop-btn {
          background: rgba(231, 76, 60, 0.9);
          color: white;
        }

        .stop-btn:hover {
          background: rgba(231, 76, 60, 1);
        }

        @media (max-width: 768px) {
          .ar-viewer-overlay {
            padding: 1rem;
          }

          .product-preview {
            flex-direction: column;
            text-align: center;
          }

          .product-image {
            width: 150px;
            height: 150px;
          }

          .ar-camera-view {
            height: 300px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ARViewer;
