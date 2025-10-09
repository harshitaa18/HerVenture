// Price Comparator API Service
// This file contains functions to integrate with various e-commerce APIs

// Mock API responses for demonstration
// In a real implementation, you would integrate with actual APIs like:
// - Amazon Product Advertising API
// - Flipkart Affiliate API
// - Snapdeal API
// - Myntra API
// - Other e-commerce APIs

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/price-comparator/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('API Error:', error);
    // Fallback to mock data if API fails
    return generateMockResults(query);
  }
};

// Fallback mock data function
const generateMockResults = (query) => {
  const platforms = [
    { name: 'Amazon', domain: 'amazon.in', searchUrl: 'https://www.amazon.in/s?k=' },
    { name: 'Flipkart', domain: 'flipkart.com', searchUrl: 'https://www.flipkart.com/search?q=' },
    { name: 'Snapdeal', domain: 'snapdeal.com', searchUrl: 'https://www.snapdeal.com/search?keyword=' },
    { name: 'Myntra', domain: 'myntra.com', searchUrl: 'https://www.myntra.com/' },
    { name: 'Paytm Mall', domain: 'paytmmall.com', searchUrl: 'https://paytmmall.com/search?q=' }
  ];
  
  // Product images based on query - using reliable image sources
  const getProductImage = (query, platform) => {
    const queryLower = query.toLowerCase();
    
    // iPhone specific images
    if (queryLower.includes('iphone')) {
      return 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&crop=center';
    }
    
    // MacBook specific images
    if (queryLower.includes('macbook') || (queryLower.includes('laptop') && queryLower.includes('apple'))) {
      return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop&crop=center';
    }
    
    // AirPods specific images
    if (queryLower.includes('airpods')) {
      return 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop&crop=center';
    }
    
    // Apple Watch specific images
    if (queryLower.includes('apple watch') || queryLower.includes('applewatch')) {
      return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center';
    }
    
    // Samsung Galaxy specific images
    if (queryLower.includes('samsung') || queryLower.includes('galaxy')) {
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center';
    }
    
    // OnePlus specific images
    if (queryLower.includes('oneplus')) {
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center';
    }
    
    // Kitchen & Baking items - specific images
    if (queryLower.includes('mixer') || queryLower.includes('mixer grinder')) {
      return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center'; // Mixer grinder
    } else if (queryLower.includes('oven') || queryLower.includes('microwave')) {
      return 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&h=300&fit=crop&crop=center'; // Oven
    } else if (queryLower.includes('mold') || queryLower.includes('mould')) {
      return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center'; // Baking molds
    } else if (queryLower.includes('tray') || queryLower.includes('baking tray')) {
      return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center'; // Baking tray
    } else if (queryLower.includes('cake box') || queryLower.includes('cake boxes')) {
      return 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center'; // Cake box
    }
    
    // Craft & Sewing items - specific images
    else if (queryLower.includes('ribbon') || queryLower.includes('ribbons')) {
      return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center'; // Ribbons
    } else if (queryLower.includes('needle') || queryLower.includes('needles')) {
      return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center'; // Sewing needles
    } else if (queryLower.includes('mannequin') || queryLower.includes('mannequins')) {
      return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&crop=center'; // Mannequin
    } else if (queryLower.includes('sewing machine') || queryLower.includes('sewing')) {
      return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center'; // Sewing machine
    }
    
    // Beauty & Hair items - specific images
    else if (queryLower.includes('hair dryer') || queryLower.includes('hairdryer')) {
      return 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop&crop=center'; // Hair dryer
    } else if (queryLower.includes('straightener') || queryLower.includes('hair straightener')) {
      return 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop&crop=center'; // Hair straightener
    } else if (queryLower.includes('wax') || queryLower.includes('waxing')) {
      return 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop&crop=center'; // Wax
    } else if (queryLower.includes('serum') || queryLower.includes('serums')) {
      return 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop&crop=center'; // Beauty serum
    }
    
    // Art & Craft items - specific images
    else if (queryLower.includes('paint') || queryLower.includes('paints')) {
      return 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop&crop=center'; // Paint tubes
    } else if (queryLower.includes('brush') || queryLower.includes('brushes')) {
      return 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop&crop=center'; // Paint brushes
    }
    
    // Jewelry & Accessories - specific images
    else if (queryLower.includes('jewelry') || queryLower.includes('jewellery')) {
      return 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center'; // Jewelry
    } else if (queryLower.includes('box') || queryLower.includes('boxes')) {
      return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center'; // Storage boxes
    }
    
    // Electronics & Lighting - specific images
    else if (queryLower.includes('led') || queryLower.includes('light') || queryLower.includes('lights')) {
      return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center'; // LED lights
    } else if (queryLower.includes('rack') || queryLower.includes('racks')) {
      return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center'; // Display racks
    } else if (queryLower.includes('printer') || queryLower.includes('printers')) {
      return 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop&crop=center'; // Printers
    }
    
    // Generic category images with reliable URLs
    else if (queryLower.includes('phone') || queryLower.includes('mobile') || queryLower.includes('smartphone')) {
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center';
    } else if (queryLower.includes('laptop') || queryLower.includes('computer')) {
      return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&crop=center';
    } else if (queryLower.includes('headphone') || queryLower.includes('earphone') || queryLower.includes('audio')) {
      return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center';
    } else if (queryLower.includes('watch') || queryLower.includes('smartwatch')) {
      return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center';
    } else if (queryLower.includes('camera') || queryLower.includes('dslr')) {
      return 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop&crop=center';
    } else if (queryLower.includes('dress') || queryLower.includes('clothing') || queryLower.includes('fashion')) {
      return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&crop=center';
    } else if (queryLower.includes('book') || queryLower.includes('novel')) {
      return 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop&crop=center';
    } else if (queryLower.includes('shoes') || queryLower.includes('footwear')) {
      return 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&crop=center';
    } else if (queryLower.includes('bag') || queryLower.includes('handbag') || queryLower.includes('backpack')) {
      return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center';
    } else {
      return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center';
    }
  };
  
  // Generate realistic product titles based on query
  const generateProductTitle = (query, platform) => {
    const queryLower = query.toLowerCase();
    const brands = ['Samsung', 'Apple', 'Sony', 'Boat', 'JBL', 'OnePlus', 'Xiaomi', 'Realme', 'HP', 'Dell', 'Lenovo', 'Asus'];
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];
    
    if (queryLower.includes('phone') || queryLower.includes('mobile') || queryLower.includes('smartphone')) {
      return `${randomBrand} ${query} - 128GB Storage, 6GB RAM, 48MP Camera`;
    } else if (queryLower.includes('laptop') || queryLower.includes('computer')) {
      return `${randomBrand} ${query} - Intel i5, 8GB RAM, 512GB SSD, Windows 11`;
    } else if (queryLower.includes('headphone') || queryLower.includes('earphone') || queryLower.includes('audio')) {
      return `${randomBrand} ${query} - Wireless Bluetooth, 30hrs Battery, Noise Cancellation`;
    } else if (queryLower.includes('watch') || queryLower.includes('smartwatch')) {
      return `${randomBrand} ${query} - Fitness Tracker, Heart Rate Monitor, Water Resistant`;
    } else if (queryLower.includes('camera') || queryLower.includes('dslr')) {
      return `${randomBrand} ${query} - 24MP, 4K Video, WiFi, Bluetooth`;
    } else if (queryLower.includes('dress') || queryLower.includes('clothing') || queryLower.includes('fashion')) {
      return `Premium ${query} - Cotton Blend, Machine Washable, Multiple Colors`;
    } else if (queryLower.includes('book') || queryLower.includes('novel')) {
      return `${query} - Paperback Edition, 300+ Pages, Best Seller`;
    } else if (queryLower.includes('shoes') || queryLower.includes('footwear')) {
      return `Comfortable ${query} - Breathable Material, Cushioned Sole, Multiple Sizes`;
    } else if (queryLower.includes('bag') || queryLower.includes('handbag') || queryLower.includes('backpack')) {
      return `Stylish ${query} - Durable Material, Multiple Compartments, Water Resistant`;
    } else {
      return `Premium ${query} - High Quality, Best Value, Fast Delivery`;
    }
  };
  
  // Generate realistic prices based on actual market prices
  const generateRealisticPrice = (query) => {
    const queryLower = query.toLowerCase();
    
    // iPhone pricing - based on actual iPhone prices in India
    if (queryLower.includes('iphone')) {
      const iphonePrices = [
        { price: 79900, originalPrice: 89900 }, // iPhone 15
        { price: 89900, originalPrice: 99900 }, // iPhone 15 Plus
        { price: 134900, originalPrice: 149900 }, // iPhone 15 Pro
        { price: 159900, originalPrice: 179900 }, // iPhone 15 Pro Max
        { price: 59900, originalPrice: 69900 }, // iPhone 14
        { price: 49900, originalPrice: 59900 }  // iPhone 13
      ];
      return iphonePrices[Math.floor(Math.random() * iphonePrices.length)];
    }
    
    // MacBook pricing - based on actual MacBook prices
    if (queryLower.includes('macbook') || (queryLower.includes('laptop') && queryLower.includes('apple'))) {
      const macbookPrices = [
        { price: 89900, originalPrice: 99900 }, // MacBook Air M2
        { price: 119900, originalPrice: 134900 }, // MacBook Air M2 15"
        { price: 199900, originalPrice: 224900 }, // MacBook Pro 14"
        { price: 249900, originalPrice: 274900 }, // MacBook Pro 16"
        { price: 79900, originalPrice: 89900 }   // MacBook Air M1
      ];
      return macbookPrices[Math.floor(Math.random() * macbookPrices.length)];
    }
    
    // AirPods pricing
    if (queryLower.includes('airpods')) {
      const airpodsPrices = [
        { price: 18900, originalPrice: 20900 }, // AirPods Pro 2
        { price: 12900, originalPrice: 14900 }, // AirPods 3
        { price: 8990, originalPrice: 10990 }   // AirPods 2
      ];
      return airpodsPrices[Math.floor(Math.random() * airpodsPrices.length)];
    }
    
    // Apple Watch pricing
    if (queryLower.includes('apple watch') || queryLower.includes('applewatch')) {
      const watchPrices = [
        { price: 29900, originalPrice: 34900 }, // Apple Watch Series 9
        { price: 19900, originalPrice: 24900 }, // Apple Watch SE
        { price: 39900, originalPrice: 44900 }  // Apple Watch Ultra
      ];
      return watchPrices[Math.floor(Math.random() * watchPrices.length)];
    }
    
    // Samsung Galaxy pricing
    if (queryLower.includes('samsung') || queryLower.includes('galaxy')) {
      const samsungPrices = [
        { price: 79999, originalPrice: 89999 }, // Galaxy S24 Ultra
        { price: 69999, originalPrice: 79999 }, // Galaxy S24 Plus
        { price: 59999, originalPrice: 69999 }, // Galaxy S24
        { price: 29999, originalPrice: 34999 }, // Galaxy A54
        { price: 19999, originalPrice: 24999 }  // Galaxy A34
      ];
      return samsungPrices[Math.floor(Math.random() * samsungPrices.length)];
    }
    
    // OnePlus pricing
    if (queryLower.includes('oneplus')) {
      const oneplusPrices = [
        { price: 39999, originalPrice: 44999 }, // OnePlus 12
        { price: 29999, originalPrice: 34999 }, // OnePlus 11R
        { price: 19999, originalPrice: 24999 }, // OnePlus Nord 3
        { price: 14999, originalPrice: 19999 }  // OnePlus Nord CE 3
      ];
      return oneplusPrices[Math.floor(Math.random() * oneplusPrices.length)];
    }
    
    // Generic smartphone pricing
    if (queryLower.includes('phone') || queryLower.includes('mobile') || queryLower.includes('smartphone')) {
      const phonePrices = [
        { price: 15999, originalPrice: 19999 },
        { price: 22999, originalPrice: 27999 },
        { price: 32999, originalPrice: 37999 },
        { price: 12999, originalPrice: 15999 },
        { price: 18999, originalPrice: 22999 }
      ];
      return phonePrices[Math.floor(Math.random() * phonePrices.length)];
    }
    
    // Laptop pricing
    if (queryLower.includes('laptop') || queryLower.includes('computer')) {
      const laptopPrices = [
        { price: 45999, originalPrice: 52999 },
        { price: 59999, originalPrice: 69999 },
        { price: 79999, originalPrice: 89999 },
        { price: 34999, originalPrice: 41999 },
        { price: 89999, originalPrice: 99999 }
      ];
      return laptopPrices[Math.floor(Math.random() * laptopPrices.length)];
    }
    
    // Headphones pricing
    if (queryLower.includes('headphone') || queryLower.includes('earphone') || queryLower.includes('audio')) {
      const audioPrices = [
        { price: 1999, originalPrice: 2999 },
        { price: 3999, originalPrice: 4999 },
        { price: 5999, originalPrice: 7999 },
        { price: 1299, originalPrice: 1999 },
        { price: 8999, originalPrice: 10999 }
      ];
      return audioPrices[Math.floor(Math.random() * audioPrices.length)];
    }
    
    // Watch pricing
    if (queryLower.includes('watch') || queryLower.includes('smartwatch')) {
      const watchPrices = [
        { price: 2999, originalPrice: 3999 },
        { price: 5999, originalPrice: 7999 },
        { price: 8999, originalPrice: 11999 },
        { price: 1999, originalPrice: 2999 },
        { price: 12999, originalPrice: 15999 }
      ];
      return watchPrices[Math.floor(Math.random() * watchPrices.length)];
    }
    
    // Camera pricing
    if (queryLower.includes('camera') || queryLower.includes('dslr')) {
      const cameraPrices = [
        { price: 29999, originalPrice: 34999 },
        { price: 49999, originalPrice: 59999 },
        { price: 79999, originalPrice: 89999 },
        { price: 19999, originalPrice: 24999 },
        { price: 99999, originalPrice: 119999 }
      ];
      return cameraPrices[Math.floor(Math.random() * cameraPrices.length)];
    }
    
    // Fashion pricing
    if (queryLower.includes('dress') || queryLower.includes('clothing') || queryLower.includes('fashion')) {
      const fashionPrices = [
        { price: 899, originalPrice: 1299 },
        { price: 1499, originalPrice: 1999 },
        { price: 2299, originalPrice: 2999 },
        { price: 599, originalPrice: 899 },
        { price: 3299, originalPrice: 3999 }
      ];
      return fashionPrices[Math.floor(Math.random() * fashionPrices.length)];
    }
    
    // Book pricing
    if (queryLower.includes('book') || queryLower.includes('novel')) {
      const bookPrices = [
        { price: 299, originalPrice: 399 },
        { price: 499, originalPrice: 699 },
        { price: 799, originalPrice: 999 },
        { price: 199, originalPrice: 299 },
        { price: 1299, originalPrice: 1599 }
      ];
      return bookPrices[Math.floor(Math.random() * bookPrices.length)];
    }
    
    // Shoes pricing
    if (queryLower.includes('shoes') || queryLower.includes('footwear')) {
      const shoePrices = [
        { price: 1299, originalPrice: 1799 },
        { price: 2299, originalPrice: 2999 },
        { price: 3999, originalPrice: 4999 },
        { price: 899, originalPrice: 1299 },
        { price: 5999, originalPrice: 7999 }
      ];
      return shoePrices[Math.floor(Math.random() * shoePrices.length)];
    }
    
    // Kitchen & Baking items pricing
    if (queryLower.includes('mixer') || queryLower.includes('mixer grinder')) {
      const mixerPrices = [
        { price: 2999, originalPrice: 3999 }, // Basic mixer
        { price: 4999, originalPrice: 6999 }, // Premium mixer
        { price: 7999, originalPrice: 9999 }, // Professional mixer
        { price: 1999, originalPrice: 2999 }, // Budget mixer
        { price: 11999, originalPrice: 14999 } // High-end mixer
      ];
      return mixerPrices[Math.floor(Math.random() * mixerPrices.length)];
    } else if (queryLower.includes('oven') || queryLower.includes('microwave')) {
      const ovenPrices = [
        { price: 8999, originalPrice: 11999 }, // Basic oven
        { price: 14999, originalPrice: 19999 }, // Convection oven
        { price: 24999, originalPrice: 29999 }, // Premium oven
        { price: 5999, originalPrice: 7999 }, // Budget oven
        { price: 39999, originalPrice: 49999 } // Professional oven
      ];
      return ovenPrices[Math.floor(Math.random() * ovenPrices.length)];
    } else if (queryLower.includes('mold') || queryLower.includes('mould')) {
      const moldPrices = [
        { price: 299, originalPrice: 499 },
        { price: 599, originalPrice: 899 },
        { price: 999, originalPrice: 1299 },
        { price: 199, originalPrice: 299 },
        { price: 1499, originalPrice: 1999 }
      ];
      return moldPrices[Math.floor(Math.random() * moldPrices.length)];
    } else if (queryLower.includes('tray') || queryLower.includes('baking tray')) {
      const trayPrices = [
        { price: 399, originalPrice: 599 },
        { price: 799, originalPrice: 999 },
        { price: 1299, originalPrice: 1699 },
        { price: 299, originalPrice: 499 },
        { price: 1999, originalPrice: 2499 }
      ];
      return trayPrices[Math.floor(Math.random() * trayPrices.length)];
    } else if (queryLower.includes('cake box') || queryLower.includes('cake boxes')) {
      const cakeBoxPrices = [
        { price: 99, originalPrice: 149 },
        { price: 199, originalPrice: 299 },
        { price: 399, originalPrice: 599 },
        { price: 49, originalPrice: 99 },
        { price: 799, originalPrice: 999 }
      ];
      return cakeBoxPrices[Math.floor(Math.random() * cakeBoxPrices.length)];
    }
    
    // Craft & Sewing items pricing
    else if (queryLower.includes('ribbon') || queryLower.includes('ribbons')) {
      const ribbonPrices = [
        { price: 49, originalPrice: 99 },
        { price: 99, originalPrice: 149 },
        { price: 199, originalPrice: 299 },
        { price: 29, originalPrice: 49 },
        { price: 399, originalPrice: 599 }
      ];
      return ribbonPrices[Math.floor(Math.random() * ribbonPrices.length)];
    } else if (queryLower.includes('needle') || queryLower.includes('needles')) {
      const needlePrices = [
        { price: 99, originalPrice: 149 },
        { price: 199, originalPrice: 299 },
        { price: 399, originalPrice: 599 },
        { price: 49, originalPrice: 99 },
        { price: 799, originalPrice: 999 }
      ];
      return needlePrices[Math.floor(Math.random() * needlePrices.length)];
    } else if (queryLower.includes('mannequin') || queryLower.includes('mannequins')) {
      const mannequinPrices = [
        { price: 2999, originalPrice: 3999 },
        { price: 4999, originalPrice: 6999 },
        { price: 7999, originalPrice: 9999 },
        { price: 1999, originalPrice: 2999 },
        { price: 12999, originalPrice: 15999 }
      ];
      return mannequinPrices[Math.floor(Math.random() * mannequinPrices.length)];
    } else if (queryLower.includes('sewing machine') || queryLower.includes('sewing')) {
      const sewingPrices = [
        { price: 8999, originalPrice: 11999 },
        { price: 14999, originalPrice: 19999 },
        { price: 24999, originalPrice: 29999 },
        { price: 5999, originalPrice: 7999 },
        { price: 39999, originalPrice: 49999 }
      ];
      return sewingPrices[Math.floor(Math.random() * sewingPrices.length)];
    }
    
    // Beauty & Hair items pricing
    else if (queryLower.includes('hair dryer') || queryLower.includes('hairdryer')) {
      const hairDryerPrices = [
        { price: 1999, originalPrice: 2999 },
        { price: 3999, originalPrice: 4999 },
        { price: 6999, originalPrice: 8999 },
        { price: 1299, originalPrice: 1999 },
        { price: 11999, originalPrice: 14999 }
      ];
      return hairDryerPrices[Math.floor(Math.random() * hairDryerPrices.length)];
    } else if (queryLower.includes('straightener') || queryLower.includes('hair straightener')) {
      const straightenerPrices = [
        { price: 1499, originalPrice: 2299 },
        { price: 2999, originalPrice: 3999 },
        { price: 4999, originalPrice: 6999 },
        { price: 999, originalPrice: 1499 },
        { price: 8999, originalPrice: 11999 }
      ];
      return straightenerPrices[Math.floor(Math.random() * straightenerPrices.length)];
    } else if (queryLower.includes('wax') || queryLower.includes('waxing')) {
      const waxPrices = [
        { price: 299, originalPrice: 499 },
        { price: 599, originalPrice: 899 },
        { price: 999, originalPrice: 1299 },
        { price: 199, originalPrice: 299 },
        { price: 1499, originalPrice: 1999 }
      ];
      return waxPrices[Math.floor(Math.random() * waxPrices.length)];
    } else if (queryLower.includes('serum') || queryLower.includes('serums')) {
      const serumPrices = [
        { price: 499, originalPrice: 799 },
        { price: 999, originalPrice: 1499 },
        { price: 1999, originalPrice: 2999 },
        { price: 299, originalPrice: 499 },
        { price: 3999, originalPrice: 5999 }
      ];
      return serumPrices[Math.floor(Math.random() * serumPrices.length)];
    }
    
    // Art & Craft items pricing
    else if (queryLower.includes('paint') || queryLower.includes('paints')) {
      const paintPrices = [
        { price: 199, originalPrice: 299 },
        { price: 399, originalPrice: 599 },
        { price: 799, originalPrice: 999 },
        { price: 99, originalPrice: 199 },
        { price: 1499, originalPrice: 1999 }
      ];
      return paintPrices[Math.floor(Math.random() * paintPrices.length)];
    } else if (queryLower.includes('brush') || queryLower.includes('brushes')) {
      const brushPrices = [
        { price: 99, originalPrice: 199 },
        { price: 199, originalPrice: 299 },
        { price: 399, originalPrice: 599 },
        { price: 49, originalPrice: 99 },
        { price: 799, originalPrice: 999 }
      ];
      return brushPrices[Math.floor(Math.random() * brushPrices.length)];
    }
    
    // Jewelry & Accessories pricing
    else if (queryLower.includes('jewelry') || queryLower.includes('jewellery')) {
      const jewelryPrices = [
        { price: 999, originalPrice: 1499 },
        { price: 1999, originalPrice: 2999 },
        { price: 4999, originalPrice: 6999 },
        { price: 499, originalPrice: 799 },
        { price: 9999, originalPrice: 14999 }
      ];
      return jewelryPrices[Math.floor(Math.random() * jewelryPrices.length)];
    } else if (queryLower.includes('box') || queryLower.includes('boxes')) {
      const boxPrices = [
        { price: 199, originalPrice: 299 },
        { price: 399, originalPrice: 599 },
        { price: 799, originalPrice: 999 },
        { price: 99, originalPrice: 199 },
        { price: 1499, originalPrice: 1999 }
      ];
      return boxPrices[Math.floor(Math.random() * boxPrices.length)];
    }
    
    // Electronics & Lighting pricing
    else if (queryLower.includes('led') || queryLower.includes('light') || queryLower.includes('lights')) {
      const ledPrices = [
        { price: 299, originalPrice: 499 },
        { price: 599, originalPrice: 899 },
        { price: 999, originalPrice: 1299 },
        { price: 199, originalPrice: 299 },
        { price: 1999, originalPrice: 2499 }
      ];
      return ledPrices[Math.floor(Math.random() * ledPrices.length)];
    } else if (queryLower.includes('rack') || queryLower.includes('racks')) {
      const rackPrices = [
        { price: 1999, originalPrice: 2999 },
        { price: 3999, originalPrice: 4999 },
        { price: 6999, originalPrice: 8999 },
        { price: 1299, originalPrice: 1999 },
        { price: 11999, originalPrice: 14999 }
      ];
      return rackPrices[Math.floor(Math.random() * rackPrices.length)];
    } else if (queryLower.includes('printer') || queryLower.includes('printers')) {
      const printerPrices = [
        { price: 4999, originalPrice: 6999 },
        { price: 8999, originalPrice: 11999 },
        { price: 14999, originalPrice: 19999 },
        { price: 2999, originalPrice: 3999 },
        { price: 24999, originalPrice: 29999 }
      ];
      return printerPrices[Math.floor(Math.random() * printerPrices.length)];
    }
    
    // Bag pricing
    else if (queryLower.includes('bag') || queryLower.includes('handbag') || queryLower.includes('backpack')) {
      const bagPrices = [
        { price: 1299, originalPrice: 1799 },
        { price: 2299, originalPrice: 2999 },
        { price: 3999, originalPrice: 4999 },
        { price: 899, originalPrice: 1299 },
        { price: 5999, originalPrice: 7999 }
      ];
      return bagPrices[Math.floor(Math.random() * bagPrices.length)];
    }
    
    // Default pricing
    return {
      price: Math.floor(Math.random() * 2000) + 500,
      originalPrice: Math.floor(Math.random() * 3000) + 1000
    };
  };
  
  return platforms.map((platform, index) => {
    const priceData = generateRealisticPrice(query);
    const discount = Math.floor(((priceData.originalPrice - priceData.price) / priceData.originalPrice) * 100);
    
    return {
      id: index + 1,
      platform: platform.name,
      title: generateProductTitle(query, platform.name),
      price: priceData.price,
      originalPrice: priceData.originalPrice,
      discount: Math.max(5, discount), // Minimum 5% discount
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      reviews: Math.floor(Math.random() * 5000) + 100,
      image: getProductImage(query, platform.name),
      url: `${platform.searchUrl}${encodeURIComponent(query)}`,
      inStock: Math.random() > 0.15,
      delivery: `${Math.floor(Math.random() * 3) + 1}-${Math.floor(Math.random() * 3) + 3} days`
    };
  });
};

// Real API integration functions (commented out for now)
// These would be implemented with actual API calls

/*
// Amazon Product Advertising API
export const searchAmazon = async (query) => {
  const response = await fetch(`/api/amazon/search?q=${encodeURIComponent(query)}`);
  return response.json();
};

// Flipkart Affiliate API
export const searchFlipkart = async (query) => {
  const response = await fetch(`/api/flipkart/search?q=${encodeURIComponent(query)}`);
  return response.json();
};

// Snapdeal API
export const searchSnapdeal = async (query) => {
  const response = await fetch(`/api/snapdeal/search?q=${encodeURIComponent(query)}`);
  return response.json();
};

// Myntra API
export const searchMyntra = async (query) => {
  const response = await fetch(`/api/myntra/search?q=${encodeURIComponent(query)}`);
  return response.json();
};
*/

// Utility function to format prices
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(price);
};

// Utility function to find the best deal
export const findBestDeal = (results) => {
  if (!results || results.length === 0) return null;
  
  return results.reduce((best, current) => {
    if (!current.inStock) return best;
    if (!best) return current;
    return current.price < best.price ? current : best;
  }, null);
};

// Utility function to sort results by price
export const sortByPrice = (results, ascending = true) => {
  return [...results].sort((a, b) => {
    if (!a.inStock && b.inStock) return 1;
    if (a.inStock && !b.inStock) return -1;
    return ascending ? a.price - b.price : b.price - a.price;
  });
};

// Utility function to filter results by platform
export const filterByPlatform = (results, platform) => {
  return results.filter(result => 
    result.platform.toLowerCase() === platform.toLowerCase()
  );
};

// Utility function to get price statistics
export const getPriceStats = (results) => {
  const inStockResults = results.filter(result => result.inStock);
  if (inStockResults.length === 0) return null;
  
  const prices = inStockResults.map(result => result.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    average: prices.reduce((sum, price) => sum + price, 0) / prices.length,
    count: inStockResults.length
  };
};
