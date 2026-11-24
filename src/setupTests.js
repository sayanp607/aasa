import '@testing-library/jest-dom';

// Mock window.matchMedia for JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock Leaflet for JSDOM test environment
window.L = {
  map: () => ({
    setView: function() { return this; },
    removeLayer: () => {},
    fitBounds: () => {},
    addLayer: () => {}
  }),
  tileLayer: () => ({ addTo: () => {} }),
  circleMarker: () => ({ 
    addTo: () => ({ 
      bindPopup: () => ({ 
        openPopup: () => {} 
      }) 
    }) 
  }),
  featureGroup: () => ({ getBounds: () => ({ pad: () => {} }) })
};
