/// <reference types="vitest/globals" />

beforeEach(() => {
  Element.prototype.scrollTo = () => {};
  Element.prototype.scrollIntoView = () => {};
  document.execCommand = vi.fn();
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  vi.mock('axios', () => {
    const mockAxios = vi.mock('axios');
  
    return {
      create: vi.fn(() => mockAxios),
    };
  });
});

afterEach(() => {
  vi.clearAllMocks();
})