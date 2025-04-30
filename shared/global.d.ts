// Global type definitions

declare global {
  interface Window {
    __ENV__?: {
      API_URL?: string;
      [key: string]: any;
    };
  }
}

export {}; 