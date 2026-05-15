const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

interface ApiErrorResponse {
  message: string;
  status: number;
  data?: unknown;
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Recuperar token del localStorage si existe
    this.token = localStorage.getItem('authToken');
  }

  setAuthToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  getAuthToken() {
    return this.token;
  }

  private buildHeaders(extraHeaders?: HeadersInit): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const token = localStorage.getItem('authToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    if (extraHeaders) {
      new Headers(extraHeaders).forEach((value, key) => {
        headers.set(key, value);
      });
    }

    return headers;
  }

  private buildUrl(url: string, params?: Record<string, string | number | boolean>): string {
    const fullUrl = `${API_BASE_URL}${url}`;
    if (!params) return fullUrl;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    return `${fullUrl}?${searchParams.toString()}`;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw {
        message: data?.message || 'An error occurred',
        status: response.status,
        data,
      } as ApiErrorResponse;
    }

    return data as T;
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    try {
      const fullUrl = this.buildUrl(url, options?.params);
      const { headers, ...requestOptions } = options || {};
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: this.buildHeaders(headers),
        ...requestOptions,
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
    try {
      const fullUrl = this.buildUrl(url, options?.params);
      const { headers, ...requestOptions } = options || {};
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: this.buildHeaders(headers),
        body: data ? JSON.stringify(data) : undefined,
        ...requestOptions,
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
    try {
      const fullUrl = this.buildUrl(url, options?.params);
      const { headers, ...requestOptions } = options || {};
      const response = await fetch(fullUrl, {
        method: 'PUT',
        headers: this.buildHeaders(headers),
        body: data ? JSON.stringify(data) : undefined,
        ...requestOptions,
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch<T>(url: string, data?: unknown, options?: RequestOptions): Promise<T> {
    try {
      const fullUrl = this.buildUrl(url, options?.params);
      const { headers, ...requestOptions } = options || {};
      const response = await fetch(fullUrl, {
        method: 'PATCH',
        headers: this.buildHeaders(headers),
        body: data ? JSON.stringify(data) : undefined,
        ...requestOptions,
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    try {
      const fullUrl = this.buildUrl(url, options?.params);
      const { headers, ...requestOptions } = options || {};
      const response = await fetch(fullUrl, {
        method: 'DELETE',
        headers: this.buildHeaders(headers),
        ...requestOptions,
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): ApiErrorResponse {
    if (error && typeof error === 'object' && 'message' in error && 'status' in error) {
      return error as ApiErrorResponse;
    }

    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      message,
      status: 500,
    };
  }
}

export const apiClient = new ApiClient();
export type { ApiErrorResponse };
