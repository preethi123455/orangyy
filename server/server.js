import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductContext = createContext();
const API_URL = process.env.REACT_APP_API_URL; // backend URL from env

const initialState = {
  products: [],
  featuredProducts: [],
  categories: [],
  loading: false,
  error: null,
  currentProduct: null,
  searchQuery: '',
  filters: {
    category: 'all',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0,
    limit: 12
  }
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        pagination: {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
          limit: action.payload.limit || 12
        },
        loading: false,
        error: null
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, products: [], loading: false, error: action.payload };
    case 'FETCH_FEATURED_SUCCESS':
      return { ...state, featuredProducts: action.payload, loading: false, error: null };
    case 'FETCH_CATEGORIES_SUCCESS':
      return { ...state, categories: action.payload };
    case 'FETCH_PRODUCT_SUCCESS':
      return { ...state, currentProduct: action.payload, loading: false, error: null };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: { category: 'all', minPrice: '', maxPrice: '', sortBy: 'createdAt', sortOrder: 'desc' },
        searchQuery: ''
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Fetch products with filters
  const fetchProducts = async (page = 1, customFilters = {}) => {
    dispatch({ type: 'FETCH_PRODUCTS_START' });
    try {
      const params = { page, limit: state.pagination.limit, ...state.filters, ...customFilters };
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === 'all') delete params[key];
      });

      const res = await axios.get(`${API_URL}/api/products`, { params });
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: res.data });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch products';
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: message });
      toast.error(message);
    }
  };

  // Featured products
  const fetchFeaturedProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`, { params: { featured: 'true', limit: 8 } });
      dispatch({ type: 'FETCH_FEATURED_SUCCESS', payload: res.data.products });
    } catch (error) {
      console.error('Error fetching featured products:', error);
      toast.error('Failed to fetch featured products');
    }
  };

  // Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products/categories/list`);
      dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: res.data });
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  // Single product
  const fetchProduct = async (id) => {
    dispatch({ type: 'FETCH_PRODUCTS_START' });
    try {
      const res = await axios.get(`${API_URL}/api/products/${id}`);
      dispatch({ type: 'FETCH_PRODUCT_SUCCESS', payload: res.data });
    } catch (error) {
      const message = error.response?.data?.message || 'Product not found';
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: message });
      toast.error(message);
    }
  };

  const setSearchQuery = (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  const setFilters = (filters) => dispatch({ type: 'SET_FILTERS', payload: filters });
  const clearFilters = () => dispatch({ type: 'CLEAR_FILTERS' });
  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  // Load featured products and categories on mount
  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
  }, []);

  // Refetch products when filters or search query change
  useEffect(() => {
    fetchProducts(1);
  }, [state.filters, state.searchQuery]);

  const value = {
    ...state,
    fetchProducts,
    fetchFeaturedProducts,
    fetchCategories,
    fetchProduct,
    setSearchQuery,
    setFilters,
    clearFilters,
    clearError
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
