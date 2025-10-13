import React, { useState, useEffect } from "react";
import "./PriceComparator.css";
import { Search, ExternalLink, Star, TrendingUp, AlertCircle } from "lucide-react";
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
    <div className="price-comparator">
      <div className="background-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="container">
        {/* Hero */}
        <section className="hero">
          <div className="hero-badge">
            <TrendingUp className="hero-badge-icon" />
            <span className="hero-badge-text">Smart comparison with live insights</span>
          </div>
          <h1 className="hero-title">
            Find the <span className="gradient-text">Best Prices</span> Instantly
          </h1>
          <p className="hero-subtitle">
            Compare prices, ratings, discounts, and availability across top stores in seconds.
          </p>
        </section>

        {/* Search */}
       <form onSubmit={handleSearch} className="search-form">
  <div className="search-container">
    <div className="search-input-wrapper">
      {/* <Search className="search-icon" /> */}
      <input
        type="text"
        placeholder="Search for products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
    </div>
    <button type="submit" className="search-button" disabled={loading}>
      {loading ? (
        <span className="spinner" />
      ) : (
        <>
          <Search className="button-icon" /> Compare Prices
        </>
      )}
    </button>
  </div>
</form>

        {/* Best deal alert */}
        {bestDeal && (
          <div className="best-deal-alert">
            <div className="best-deal-content">
              <div className="best-deal-icon-wrapper">
                <TrendingUp className="best-deal-icon" />
              </div>
              <div className="best-deal-text">
                <div className="best-deal-title">
                  🏆 Best Deal Found <span className="live-badge">LIVE</span>
                </div>
                <div className="best-deal-description">
                  <span className="best-deal-platform">{bestDeal.platform}</span> offers the lowest price at
                  <span className="best-deal-price"> {formatPrice(bestDeal.price)}</span>
                  {bestDeal.discount > 0 && (
                    <span className="discount-badge">{bestDeal.discount}% OFF</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="error-message">
            <AlertCircle className="error-icon" />
            <p className="error-text">{error}</p>
          </div>
        )}

        {/* Results */}
        {searchResults.length > 0 && (
          <section className="results-section">
            <div className="results-header">
              <div>
                <h2 className="results-title">Price Comparison Results</h2>
                <div className="results-subtitle">Sorted by {sortOrder}</div>
              </div>
              <div className="sort-control">
                <span className="sort-label">Sort by</span>
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
                <div className="price-stats-grid">
                  <div>
                    <div className="price-stat-label">Lowest Price</div>
                    <div className="price-stat-value lowest">{formatPrice(priceStats.min)}</div>
                  </div>
                  <div>
                    <div className="price-stat-label">Highest Price</div>
                    <div className="price-stat-value highest">{formatPrice(priceStats.max)}</div>
                  </div>
                  <div>
                    <div className="price-stat-label">Average Price</div>
                    <div className="price-stat-value average">{formatPrice(Math.round(priceStats.average))}</div>
                  </div>
                  <div>
                    <div className="price-stat-label">Available Options</div>
                    <div className="price-stat-value count">{priceStats.count}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="results-grid">
              {searchResults.map((result) => (
                <div key={result.id} className={`product-card ${result.id === bestDeal?.id ? 'best-deal' : ''}`}>
                  <div className="product-header">
                    <div>
                      <div className="product-platform">{result.platform}</div>
                      {result.id === bestDeal?.id && <span className="best-badge">BEST DEAL</span>}
                    </div>
                    <span className={`stock-badge ${result.inStock ? 'in-stock' : 'out-of-stock'}`}>
                      {result.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="product-image-wrapper">
                    <div className="product-image-container">
                      <img className="product-image" src={result.image} alt={result.title} />
                      {result.discount > 0 && (
                        <span className="discount-badge-image">-{result.discount}%</span>
                      )}
                    </div>
                  </div>

                  <div className="product-title">{result.title}</div>

                  <div className="product-rating">
                    <Star className="star filled" />
                    <span className="rating-value">{result.rating}</span>
                    <span className="rating-count">({result.reviews} reviews)</span>
                  </div>

                  <div className="product-price">
                    <div className="current-price">{formatPrice(result.price)}</div>
                    {result.originalPrice > result.price && (
                      <div className="original-price">{formatPrice(result.originalPrice)}</div>
                    )}
                    <div className="product-delivery">🚚 {result.delivery}</div>
                  </div>

                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-button"
                  >
                    <ExternalLink className="view-button-icon" />
                    View on {result.platform}
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* feature_prices */}
        <section className="feature_prices-section">
          <h2 className="feature_prices-title">Why Choose Our Price Comparator?</h2>
          <div className="feature_prices-grid">
            <div className="feature_price-card">
              <div className="feature_price-icon-wrapper"><span className="feature_price-icon">🔍</span></div>
              <div className="feature_price-title">Comprehensive Search</div>
              <div className="feature_price-description">Search across Amazon, Flipkart, Myntra, and more platforms.</div>
            </div>
            <div className="feature_price-card">
              <div className="feature_price-icon-wrapper"><span className="feature_price-icon">⚡</span></div>
              <div className="feature_price-title">Real-time Prices</div>
              <div className="feature_price-description">Up-to-date pricing and availability status.</div>
            </div>
            <div className="feature_price-card">
              <div className="feature_price-icon-wrapper"><span className="feature_price-icon">💰</span></div>
              <div className="feature_price-title">Best Deals</div>
              <div className="feature_price-description">Instantly identify the top savings.</div>
            </div>
            <div className="feature_price-card">
              <div className="feature_price-icon-wrapper"><span className="feature_price-icon">📊</span></div>
              <div className="feature_price-title">Detailed Reviews</div>
              <div className="feature_price-description">Compare ratings to make informed decisions.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PriceComparator;
