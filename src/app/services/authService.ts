/**
 * Servicio de Autenticación - Cliente
 * Maneja login, logout, token storage y verificación
 */

const API_URL = import.meta.env.VITE_API_URL || '/api';

interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    username: string;
    email: string;
    role: string;
  };
  expiresIn: string;
}

interface User {
  username: string;
  email: string;
  role: string;
}

class AuthService {
  private tokenKey = 'zoomat_auth_token';
  private userKey = 'zoomat_user';

  /**
   * Realiza login
   */
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al autenticar');
      }

      const data = await response.json();

      // Guardar token y usuario
      if (data.success && data.token) {
        localStorage.setItem(this.tokenKey, data.token);
        localStorage.setItem(this.userKey, JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Verifica si está autenticado
   */
  async isAuthenticated(): Promise<boolean> {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      return data.valid === true;
    } catch {
      return false;
    }
  }

  /**
   * Obtiene el token almacenado
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Obtiene usuario almacenado
   */
  getUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Realiza logout
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  /**
   * Retorna headers de autenticación
   */
  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
}

export default new AuthService();
