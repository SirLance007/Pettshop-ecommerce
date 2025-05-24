import {
  recordMetric,
  trackPageLoad,
  trackApiCall,
  trackInteraction,
  getPerformanceReport,
  measureComponentRender
} from '../performance';

describe('Performance Utilities', () => {
  beforeEach(() => {
    // Clear all metrics before each test
    jest.useFakeTimers();
    Object.keys(require('../performance').metrics).forEach(key => {
      require('../performance').metrics[key] = {};
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('recordMetric', () => {
    it('records metrics correctly', () => {
      recordMetric('test', 100);
      recordMetric('test', 200);
      
      const report = getPerformanceReport();
      expect(report.general.test.average).toBe(150);
      expect(report.general.test.samples).toBe(2);
    });

    it('limits stored metrics to 100', () => {
      for (let i = 0; i < 110; i++) {
        recordMetric('test', i);
      }
      
      const report = getPerformanceReport();
      expect(report.general.test.samples).toBe(100);
      expect(report.general.test.lastValue).toBe(109);
    });

    it('handles different categories', () => {
      recordMetric('test', 100, 'category1');
      recordMetric('test', 200, 'category2');
      
      const report = getPerformanceReport();
      expect(report.category1.test.average).toBe(100);
      expect(report.category2.test.average).toBe(200);
    });
  });

  describe('trackPageLoad', () => {
    beforeEach(() => {
      // Mock performance.timing
      window.performance.timing = {
        navigationStart: 1000,
        loadEventEnd: 2000,
        domContentLoadedEventEnd: 1500
      };
    });

    it('records page load metrics', () => {
      trackPageLoad('homepage');
      
      const report = getPerformanceReport();
      expect(report.pageLoads.homepage_load.lastValue).toBe(1000); // 2000 - 1000
      expect(report.pageLoads.homepage_domReady.lastValue).toBe(500); // 1500 - 1000
    });
  });

  describe('trackApiCall', () => {
    it('measures API call duration', () => {
      const startTime = Date.now() - 1000; // 1 second ago
      trackApiCall('/api/test', startTime);
      
      const report = getPerformanceReport();
      expect(report.apiCalls['/api/test'].lastValue).toBeGreaterThanOrEqual(1000);
    });
  });

  describe('trackInteraction', () => {
    it('records interaction metrics', () => {
      trackInteraction('click', 100);
      trackInteraction('click', 200);
      
      const report = getPerformanceReport();
      expect(report.interactions.click.average).toBe(150);
      expect(report.interactions.click.samples).toBe(2);
    });
  });

  describe('measureComponentRender', () => {
    it('measures component render time', () => {
      const endMeasure = measureComponentRender('TestComponent');
      
      // Simulate some time passing
      jest.advanceTimersByTime(50);
      
      endMeasure();
      
      const report = getPerformanceReport();
      expect(report.interactions.TestComponent_render.lastValue).toBe(50);
    });
  });

  describe('getPerformanceReport', () => {
    beforeEach(() => {
      // Add some test metrics
      recordMetric('test', 100);
      recordMetric('test', 200);
      recordMetric('test', 300);
    });

    it('calculates statistics correctly', () => {
      const report = getPerformanceReport();
      
      expect(report.general.test).toEqual({
        average: 200,
        p95: 300,
        p99: 300,
        samples: 3,
        lastValue: 300
      });
    });

    it('handles empty metrics', () => {
      const report = getPerformanceReport();
      expect(report.emptyCategory).toBeUndefined();
    });

    it('calculates percentiles correctly', () => {
      for (let i = 1; i <= 100; i++) {
        recordMetric('percentile_test', i);
      }
      
      const report = getPerformanceReport();
      expect(report.general.percentile_test.p95).toBe(95);
      expect(report.general.percentile_test.p99).toBe(99);
    });
  });
}); 