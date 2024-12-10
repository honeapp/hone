// Version our APIs for future mobile integration
export const API_VERSION = 'v1';
export const BASE_URL = `/api/${API_VERSION}`;

// API Response types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
