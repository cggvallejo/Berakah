import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { syncWithGithub } from './AdminPanel';

describe('syncWithGithub', () => {
  const mockToken = 'mock-token';
  const mockFilePath = 'path/to/file.js';
  const mockContent = 'mock content con acentos áéíóú';

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('throws an error if no token is provided', async () => {
    await expect(syncWithGithub('', mockFilePath, mockContent)).rejects.toThrow('No hay token configurado');
    await expect(syncWithGithub(null, mockFilePath, mockContent)).rejects.toThrow('No hay token configurado');
    await expect(syncWithGithub(undefined, mockFilePath, mockContent)).rejects.toThrow('No hay token configurado');
  });

  it('successfully synchronizes with GitHub', async () => {
    const mockOnProgress = vi.fn();
    const mockSha = 'mock-sha-123';

    // Mock the fetch calls
    // First call: GET current file
    // Second call: PUT new content
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ sha: mockSha })
    }).mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });

    await syncWithGithub(mockToken, mockFilePath, mockContent, mockOnProgress);

    // Verify GET call
    expect(global.fetch).toHaveBeenNthCalledWith(1, `https://api.github.com/repos/cggvallejo/Berakah/contents/${mockFilePath}`, {
      headers: {
        'Authorization': `Bearer ${mockToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      }
    });

    // Verify PUT call
    const expectedBase64 = btoa(unescape(encodeURIComponent(mockContent)));
    expect(global.fetch).toHaveBeenNthCalledWith(2, `https://api.github.com/repos/cggvallejo/Berakah/contents/${mockFilePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${mockToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Actualización del catálogo de productos desde el Panel web',
        content: expectedBase64,
        sha: mockSha
      })
    });

    // Verify progress callbacks
    expect(mockOnProgress).toHaveBeenCalledWith('Preparando sincronización...', 10);
    expect(mockOnProgress).toHaveBeenCalledWith('Conectando con GitHub...', 30);
    expect(mockOnProgress).toHaveBeenCalledWith('Procesando nuevos cambios...', 50);
    expect(mockOnProgress).toHaveBeenCalledWith('Subiendo commit al repositorio...', 80);
    expect(mockOnProgress).toHaveBeenCalledWith('¡Sincronización Exitosa!', 100);
  });

  it('throws an error if GET request fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false
    });

    await expect(syncWithGithub(mockToken, mockFilePath, mockContent)).rejects.toThrow('Error al obtener el archivo del repositorio');
  });

  it('throws an error if PUT request fails and error message is returned', async () => {
    const mockSha = 'mock-sha-123';
    const errorMessage = 'Commit failed';

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ sha: mockSha })
    }).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: errorMessage })
    });

    await expect(syncWithGithub(mockToken, mockFilePath, mockContent)).rejects.toThrow(errorMessage);
  });

  it('throws a default error if PUT request fails and no message is provided', async () => {
    const mockSha = 'mock-sha-123';

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ sha: mockSha })
    }).mockResolvedValueOnce({
      ok: false,
      json: async () => ({})
    });

    await expect(syncWithGithub(mockToken, mockFilePath, mockContent)).rejects.toThrow('Error al hacer el commit en GitHub');
  });
});
