import { apiClient } from './api';

export interface Species {
  id: number;
  name: string;
  scientificName?: string;
  description?: string;
  image?: string;
  habitat?: string;
  diet?: string;
  size?: string;
  weight?: string;
  lifespan?: string;
  threats?: string;
  importance?: string;
  funFacts?: string[];
  qrCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SpeciesCreateInput {
  name: string;
  scientificName?: string;
  description?: string;
  image?: string;
  habitat?: string;
  diet?: string;
  size?: string;
  weight?: string;
  lifespan?: string;
  threats?: string;
  importance?: string;
  funFacts?: string[];
}

export interface QRCodeData {
  id: number;
  code: string;
  speciesId: number;
  createdAt: string;
  expiresAt?: string;
  scanCount: number;
  lastScanned?: string;
}

export interface QRGenerateRequest {
  speciesId: number;
}

export interface QRScanResponse {
  species: Species;
  qr: QRCodeData;
}

class SpeciesService {
  // ============ SPECIES ENDPOINTS ============

  async getAll(filters?: {
    search?: string;
    habitat?: string;
    diet?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ data: Species[]; total: number }> {
    const response = await apiClient.get<Species[]>('/species', { params: filters as any });
    // El API retorna un array directo, lo envolvemos en el formato esperado
    return {
      data: Array.isArray(response) ? response : [],
      total: Array.isArray(response) ? response.length : 0,
    };
  }

  async getById(id: number): Promise<Species> {
    return apiClient.get(`/species/${id}`);
  }

  async create(data: SpeciesCreateInput): Promise<Species> {
    return apiClient.post('/species', data);
  }

  async update(id: number, data: Partial<SpeciesCreateInput>): Promise<Species> {
    return apiClient.put(`/species/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    return apiClient.delete(`/species/${id}`);
  }

  // ============ QR CODE ENDPOINTS ============

  async generateQRCode(speciesId: number): Promise<QRCodeData> {
    return apiClient.post('/qr/generate', { speciesId });
  }

  async getQRCodeByCode(code: string): Promise<QRScanResponse> {
    return apiClient.get(`/qr/${code}`);
  }

  async validateQRCode(code: string): Promise<{ valid: boolean; speciesId?: number }> {
    return apiClient.post('/qr/validate', { code });
  }

  async getQRCodes(filters?: {
    speciesId?: number;
    limit?: number;
    offset?: number;
  }): Promise<{ data: QRCodeData[]; total: number }> {
    return apiClient.get('/qr', { params: filters });
  }

  async getQRCodeBySpeciesId(speciesId: number): Promise<QRCodeData | null> {
    try {
      const response = await apiClient.get(`/qr/species/${speciesId}`);
      return response;
    } catch {
      return null;
    }
  }

  // ============ HELPER METHODS ============

  async getSpeciesByQRCode(qrCode: string): Promise<Species | null> {
    try {
      const response = await this.getQRCodeByCode(qrCode);
      return response.species;
    } catch {
      return null;
    }
  }

  async searchSpecies(query: string): Promise<Species[]> {
    const response = await this.getAll({ search: query });
    return response.data;
  }

  async getSpeciesByHabitat(habitat: string): Promise<Species[]> {
    const response = await this.getAll({ habitat });
    return response.data;
  }

  async getSpeciesByDiet(diet: string): Promise<Species[]> {
    const response = await this.getAll({ diet });
    return response.data;
  }
}

export const speciesService = new SpeciesService();
