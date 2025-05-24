// Performance metrics collection
const metrics = {
  pageLoads: {},
  apiCalls: {},
  interactions: {},
  resources: {}
};

// Web Vitals tracking
export const trackWebVitals = () => {
  if ('web-vitals' in window) {
    window.webVitals.getCLS((metric) => recordMetric('CLS', metric.value));
    window.webVitals.getFID((metric) => recordMetric('FID', metric.value));
    window.webVitals.getLCP((metric) => recordMetric('LCP', metric.value));
    window.webVitals.getFCP((metric) => recordMetric('FCP', metric.value));
    window.webVitals.getTTFB((metric) => recordMetric('TTFB', metric.value));
  }
};

// Record performance metric
export const recordMetric = (name, value, category = 'general') => {
  if (!metrics[category]) {
    metrics[category] = {};
  }
  
  if (!metrics[category][name]) {
    metrics[category][name] = [];
  }
  
  metrics[category][name].push({
    value,
    timestamp: Date.now()
  });

  // Keep only last 100 measurements
  if (metrics[category][name].length > 100) {
    metrics[category][name].shift();
  }
};

// Track page load performance
export const trackPageLoad = (pageName) => {
  const timing = window.performance.timing;
  const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
  const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
  
  recordMetric(`${pageName}_load`, pageLoadTime, 'pageLoads');
  recordMetric(`${pageName}_domReady`, domReadyTime, 'pageLoads');
};

// Track API call performance
export const trackApiCall = (endpoint, startTime) => {
  const duration = Date.now() - startTime;
  recordMetric(endpoint, duration, 'apiCalls');
};

// Track user interaction performance
export const trackInteraction = (actionName, duration) => {
  recordMetric(actionName, duration, 'interactions');
};

// Track resource loading
export const trackResourceLoading = () => {
  window.addEventListener('load', () => {
    const resources = window.performance.getEntriesByType('resource');
    
    resources.forEach(resource => {
      const { name, initiatorType, duration } = resource;
      recordMetric(
        `${initiatorType}_${name.split('/').pop()}`,
        duration,
        'resources'
      );
    });
  });
};

// Get performance report
export const getPerformanceReport = () => {
  const report = {};
  
  Object.entries(metrics).forEach(([category, measurements]) => {
    report[category] = {};
    
    Object.entries(measurements).forEach(([name, values]) => {
      const numValues = values.length;
      if (numValues === 0) return;
      
      const sum = values.reduce((acc, curr) => acc + curr.value, 0);
      const avg = sum / numValues;
      
      const sorted = [...values].sort((a, b) => a.value - b.value);
      const p95 = sorted[Math.floor(numValues * 0.95)];
      const p99 = sorted[Math.floor(numValues * 0.99)];
      
      report[category][name] = {
        average: avg,
        p95: p95?.value,
        p99: p99?.value,
        samples: numValues,
        lastValue: values[values.length - 1].value
      };
    });
  });
  
  return report;
};

// Initialize performance monitoring
export const initializePerformanceMonitoring = () => {
  // Track Web Vitals
  trackWebVitals();
  
  // Track resource loading
  trackResourceLoading();
  
  // Set up PerformanceObserver for long tasks
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        recordMetric('longTask', entry.duration, 'interactions');
      });
    });
    
    observer.observe({ entryTypes: ['longtask'] });
  }
  
  // Report metrics periodically
  setInterval(() => {
    const report = getPerformanceReport();
    console.log('Performance Report:', report);
    
    // You can send this to your analytics service
    // sendToAnalytics(report);
  }, 60000); // Every minute
};

// Helper to measure component render time
export const measureComponentRender = (componentName) => {
  const startTime = performance.now();
  
  return () => {
    const duration = performance.now() - startTime;
    recordMetric(`${componentName}_render`, duration, 'interactions');
  };
}; 