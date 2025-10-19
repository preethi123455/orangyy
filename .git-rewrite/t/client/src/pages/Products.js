import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaSort, FaTh, FaList, FaTimes, FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Products = () => {
  const { 
    products, 
    loading, 
    fetchProducts, 
    pagination, 
    categories, 
    setSearchQuery, 
    setFilters, 
    clearFilters,
    filters 
  } = useProducts();
  
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Sample products data for demonstration
  const sampleProducts = [
    {
      _id: '1',
      name: 'Fresh Valencia Orange Juice',
      description: 'Pure, freshly squeezed Valencia orange juice with no additives. Rich in vitamin C and natural sweetness.',
      price: 8.99,
      originalPrice: 10.99,
      category: 'fresh',
      size: '500ml',
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop',
      rating: 4.8,
      numReviews: 124,
      inStock: true,
      discount: 18,
      isFeatured: true
    },
    {
      _id: '2',
      name: 'Organic Blood Orange Juice',
      description: 'Premium organic blood orange juice with a unique deep red color and intense citrus flavor.',
      price: 12.99,
      originalPrice: 12.99,
      category: 'organic',
      size: '500ml',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.9,
      numReviews: 89,
      inStock: true,
      discount: 0,
      isFeatured: true
    },
    {
      _id: '3',
      name: 'Premium Navel Orange Juice',
      description: 'Hand-picked navel oranges pressed to perfection. Smooth texture with a perfect balance of sweet and tangy.',
      price: 15.99,
      originalPrice: 18.99,
      category: 'premium',
      size: '1L',
      image: 'https://images.unsplash.com/photo-1557800634-7bf3a73d34c2?w=400&h=400&fit=crop',
      rating: 4.7,
      numReviews: 156,
      inStock: true,
      discount: 16,
      isFeatured: false
    },
    {
      _id: '4',
      name: 'Tropical Orange Blend',
      description: 'Exotic blend of orange with tropical fruits. A refreshing twist on classic orange juice.',
      price: 11.99,
      originalPrice: 11.99,
      category: 'tropical',
      size: '750ml',
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop',
      rating: 4.6,
      numReviews: 73,
      inStock: true,
      discount: 0,
      isFeatured: false
    },
    {
      _id: '5',
      name: 'Seasonal Winter Orange',
      description: 'Limited edition winter orange juice with enhanced sweetness and warming spices.',
      price: 13.99,
      originalPrice: 16.99,
      category: 'seasonal',
      size: '500ml',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      rating: 4.8,
      numReviews: 45,
      inStock: true,
      discount: 18,
      isFeatured: true
    },
    {
      _id: '6',
      name: 'Organic Valencia Premium',
      description: 'Ultra-premium organic Valencia orange juice. Single-origin, cold-pressed for maximum nutrition.',
      price: 19.99,
      originalPrice: 19.99,
      category: 'organic',
      size: '1L',
      image: 'https://images.unsplash.com/photo-1557800634-7bf3a73d34c2?w=400&h=400&fit=crop',
      rating: 4.9,
      numReviews: 92,
      inStock: true,
      discount: 0,
      isFeatured: true
    }
  ];

  const [displayProducts, setDisplayProducts] = useState(sampleProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
    // Filter products based on search term
    const filtered = sampleProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayProducts(filtered);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setDisplayProducts(sampleProducts);
    } else {
      const filtered = sampleProducts.filter(product => product.category === category);
      setDisplayProducts(filtered);
    }
  };

  const handlePriceFilter = () => {
    let filtered = sampleProducts;
    
    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
    }
    
    setDisplayProducts(filtered);
  };

  const handleSort = (sortField, order) => {
    setSortBy(sortField);
    setSortOrder(order);
    
    const sorted = [...displayProducts].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'price') {
        aVal = a.price;
        bVal = b.price;
      }
      
      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    setDisplayProducts(sorted);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange({ min: '', max: '' });
    setSortBy('createdAt');
    setSortOrder('desc');
    setDisplayProducts(sampleProducts);
    clearFilters();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-content"
          >
            <h1>Our Premium Orange Juices</h1>
            <p>Discover the finest selection of fresh, organic, and delicious orange juices</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{displayProducts.length}</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">5</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Fresh</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="search-filters-section"
        >
          <div className="search-bar">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-group">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for orange juices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="filters-toolbar">
            <button
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              Filters
            </button>

            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <FaTh />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <FaList />
              </button>
            </div>

            <div className="sort-controls">
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  handleSort(field, order);
                }}
                className="sort-select"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="filters-panel"
            >
              <div className="filters-content">
                <div className="filter-group">
                  <h4>Categories</h4>
                  <div className="category-filters">
                    <button
                      className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                      onClick={() => handleCategoryFilter('all')}
                    >
                      All Products
                    </button>
                    <button
                      className={`category-btn ${selectedCategory === 'fresh' ? 'active' : ''}`}
                      onClick={() => handleCategoryFilter('fresh')}
                    >
                      Fresh
                    </button>
                    <button
                      className={`category-btn ${selectedCategory === 'organic' ? 'active' : ''}`}
                      onClick={() => handleCategoryFilter('organic')}
                    >
                      Organic
                    </button>
                    <button
                      className={`category-btn ${selectedCategory === 'premium' ? 'active' : ''}`}
                      onClick={() => handleCategoryFilter('premium')}
                    >
                      Premium
                    </button>
                    <button
                      className={`category-btn ${selectedCategory === 'seasonal' ? 'active' : ''}`}
                      onClick={() => handleCategoryFilter('seasonal')}
                    >
                      Seasonal
                    </button>
                    <button
                      className={`category-btn ${selectedCategory === 'tropical' ? 'active' : ''}`}
                      onClick={() => handleCategoryFilter('tropical')}
                    >
                      Tropical
                    </button>
                  </div>
                </div>

                <div className="filter-group">
                  <h4>Price Range</h4>
                  <div className="price-filters">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      className="price-input"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      className="price-input"
                    />
                    <button onClick={handlePriceFilter} className="apply-btn">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="filter-actions">
                  <button onClick={clearAllFilters} className="clear-btn">
                    Clear All
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="products-section"
        >
          <div className="products-header">
            <h2>Our Products</h2>
            <p>Showing {displayProducts.length} products</p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <div className={`products-grid ${viewMode}`}>
              {displayProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          {displayProducts.length === 0 && !loading && (
            <div className="no-products">
              <div className="no-products-content">
                <FaSearch size={64} />
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button onClick={clearAllFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        .products-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .products-hero {
          background: linear-gradient(135deg, var(--primary-orange) 0%, var(--secondary-orange) 100%);
          color: white;
          padding: 4rem 0;
          text-align: center;
        }

        .hero-content h1 {
          font-size: var(--font-6xl);
          margin-bottom: 1rem;
          font-family: var(--font-display);
        }

        .hero-content p {
          font-size: var(--font-xl);
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2rem;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: var(--font-4xl);
          font-weight: 700;
          line-height: 1;
        }

        .stat-label {
          font-size: var(--font-lg);
          opacity: 0.8;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .search-filters-section {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          margin: -2rem auto 2rem;
          position: relative;
          z-index: 10;
        }

        .search-form {
          margin-bottom: 1.5rem;
        }

        .search-input-group {
          display: flex;
          align-items: center;
          background: #f8f9fa;
          border-radius: 25px;
          padding: 0.5rem;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .search-input-group:focus-within {
          border-color: var(--primary-orange);
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .search-icon {
          color: var(--text-light);
          margin: 0 1rem;
        }

        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 1rem;
          outline: none;
        }

        .search-button {
          background: var(--primary-orange);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-button:hover {
          background: var(--dark-orange);
          transform: translateY(-2px);
        }

        .filters-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-light);
          border: 2px solid #e1e8ed;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-toggle:hover {
          border-color: var(--primary-orange);
          color: var(--primary-orange);
        }

        .view-controls {
          display: flex;
          gap: 0.5rem;
        }

        .view-btn {
          width: 40px;
          height: 40px;
          border: 2px solid #e1e8ed;
          background: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-btn.active {
          background: var(--primary-orange);
          color: white;
          border-color: var(--primary-orange);
        }

        .sort-select {
          padding: 0.75rem 1rem;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sort-select:focus {
          outline: none;
          border-color: var(--primary-orange);
        }

        .filters-panel {
          background: white;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
          overflow: hidden;
        }

        .filters-content {
          padding: 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr auto;
          gap: 2rem;
          align-items: start;
        }

        .filter-group h4 {
          margin-bottom: 1rem;
          color: var(--text-dark);
        }

        .category-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .category-btn {
          padding: 0.5rem 1rem;
          border: 2px solid #e1e8ed;
          background: white;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .category-btn.active {
          background: var(--primary-orange);
          color: white;
          border-color: var(--primary-orange);
        }

        .price-filters {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .price-input {
          width: 100px;
          padding: 0.5rem;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          text-align: center;
        }

        .apply-btn {
          background: var(--primary-orange);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
        }

        .clear-btn {
          background: transparent;
          color: var(--text-light);
          border: 2px solid #e1e8ed;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .clear-btn:hover {
          border-color: var(--error);
          color: var(--error);
        }

        .products-section {
          padding: 2rem 0;
        }

        .products-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .products-header h2 {
          font-size: var(--font-5xl);
          color: var(--text-dark);
          margin-bottom: 0.5rem;
        }

        .products-header p {
          color: var(--text-light);
          font-size: var(--font-xl);
        }

        .products-grid {
          display: grid;
          gap: 2rem;
        }

        .products-grid.grid {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .products-grid.list {
          grid-template-columns: 1fr;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 0;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid var(--primary-orange);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        .no-products {
          text-align: center;
          padding: 4rem 0;
        }

        .no-products-content {
          color: var(--text-light);
        }

        .no-products-content h3 {
          margin: 1rem 0;
          color: var(--text-dark);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .filters-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .filters-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .search-input-group {
            flex-direction: column;
            gap: 0.5rem;
          }

          .search-button {
            width: 100%;
          }

          .products-grid.grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;
