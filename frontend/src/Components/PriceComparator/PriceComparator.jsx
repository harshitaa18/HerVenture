import React, { useState, useEffect } from "react";
import "./PriceComparator.css";
import { Search, ExternalLink, Star, TrendingUp, AlertCircle } from "lucide-react";
import img2 from "../../Components/Assets/best_deal.webp";
import { searchProducts, formatPrice, findBestDeal, sortByPrice, getPriceStats } from "../../utils/priceComparatorAPI";

const PriceComparator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('price'); // 'price', 'rating', 'discount'
  const [priceStats, setPriceStats] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await searchProducts(searchQuery);
      setSearchResults(results);
      
      // Calculate price statistics
      const stats = getPriceStats(results);
      setPriceStats(stats);
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    let sortedResults = [...searchResults];
    
    switch (newSortOrder) {
      case 'price':
        sortedResults = sortByPrice(sortedResults, true);
        break;
      case 'rating':
        sortedResults = sortedResults.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'discount':
        sortedResults = sortedResults.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }
    
    setSearchResults(sortedResults);
  };

  const bestDeal = findBestDeal(searchResults);

  return (
    <div className="price-comparator-container">
      {/* Header Section */}
      <div className="comparator-header">
        <div className="header-content">
          <h1>💰 Price Comparator</h1>
          <p>
            Find the best deals across trusted online stores with <b>real-time price insights</b>.
            Compare prices, ratings, and discounts confidently, and save both time and money.
          </p>
        </div>
        <div className="header-image">
          <img src={img2} alt="Best Deals" className="deal-image" />
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search for products (e.g., iPhone 15, Samsung Galaxy, Laptop...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? "Searching..." : "Compare Prices"}
            </button>
          </div>
        </form>
      </div>

      {/* Best Deal Banner */}
      {bestDeal && (
        <div className="best-deal-banner">
          <TrendingUp className="trending-icon" />
          <div className="best-deal-content">
            <h3>🏆 Best Deal Found!</h3>
            <p>
              <strong>{bestDeal.platform}</strong> offers the lowest price at {formatPrice(bestDeal.price)}
              {bestDeal.discount > 0 && (
                <span className="discount-badge"> ({bestDeal.discount}% OFF)</span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {error && (
        <div className="error-message">
          <AlertCircle className="error-icon" />
          <p>{error}</p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="results-section">
          <div className="results-header">
            <h2>Price Comparison Results</h2>
            <div className="sort-controls">
              <label>Sort by:</label>
              <select 
                value={sortOrder} 
                onChange={(e) => handleSortChange(e.target.value)}
                className="sort-select"
              >
                <option value="price">Price (Low to High)</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="discount">Discount (High to Low)</option>
              </select>
            </div>
          </div>
          
          {priceStats && (
            <div className="price-stats">
              <div className="stat-item">
                <span className="stat-label">Lowest Price:</span>
                <span className="stat-value">{formatPrice(priceStats.min)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Highest Price:</span>
                <span className="stat-value">{formatPrice(priceStats.max)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Average Price:</span>
                <span className="stat-value">{formatPrice(Math.round(priceStats.average))}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Available Options:</span>
                <span className="stat-value">{priceStats.count}</span>
              </div>
            </div>
          )}
          
          <div className="results-grid">
            {searchResults.map((result) => (
              <div key={result.id} className={`result-card ${result.id === bestDeal?.id ? 'best-deal' : ''}`}>
                <div className="result-header">
                  <div className="platform-info">
                    <h3>{result.platform}</h3>
                    {result.id === bestDeal?.id && <span className="best-deal-badge">BEST DEAL</span>}
                  </div>
                  <div className="stock-status">
                    {result.inStock ? (
                      <span className="in-stock">✓ In Stock</span>
                    ) : (
                      <span className="out-of-stock">✗ Out of Stock</span>
                    )}
                  </div>
                </div>

                <div className="product-image">
                  <img src={result.image} alt={result.title} />
                </div>

                <div className="product-details">
                  <h4 className="product-title">{result.title}</h4>
                  
                  <div className="rating-section">
                    <div className="rating">
                      <Star className="star-icon" />
                      <span>{result.rating}</span>
                    </div>
                    <span className="reviews">({result.reviews} reviews)</span>
                  </div>

                  <div className="price-section">
                    <div className="current-price">{formatPrice(result.price)}</div>
                    {result.originalPrice > result.price && (
                      <div className="original-price">{formatPrice(result.originalPrice)}</div>
                    )}
                    {result.discount > 0 && (
                      <div className="discount">{result.discount}% OFF</div>
                    )}
                  </div>

                  <div className="delivery-info">
                    <span>🚚 {result.delivery}</span>
                  </div>

                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="visit-button"
                  >
                    <ExternalLink className="external-icon" />
                    Visit {result.platform}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose Our Price Comparator?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Comprehensive Search</h3>
            <p>Search across Amazon, Flipkart, Snapdeal, Myntra, and more popular platforms</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Prices</h3>
            <p>Get the most up-to-date pricing information and availability status</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Deals</h3>
            <p>Instantly identify the best deals with our smart comparison algorithm</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Detailed Reviews</h3>
            <p>Compare ratings and reviews to make informed purchasing decisions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceComparator;
