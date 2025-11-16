/**
 * API Utility Functions
 * 
 * Helper functions for making API calls and handling responses
 */

/**
 * Generic API fetch wrapper with error handling
 * Example: const data = await apiRequest('/api/users', { method: 'GET' });
 */
export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * POST request helper
 * Example: const result = await post('/api/feedback', { name: 'John', email: 'john@example.com' });
 */
export async function post<T>(url: string, data: any): Promise<T> {
  return apiRequest<T>(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * GET request helper
 * Example: const users = await get('/api/users');
 */
export async function get<T>(url: string): Promise<T> {
  return apiRequest<T>(url, {
    method: 'GET',
  });
}

/**
 * PUT request helper
 * Example: const updated = await put('/api/users/1', { name: 'Jane' });
 */
export async function put<T>(url: string, data: any): Promise<T> {
  return apiRequest<T>(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request helper
 * Example: await del('/api/users/1');
 */
export async function del<T>(url: string): Promise<T> {
  return apiRequest<T>(url, {
    method: 'DELETE',
  });
}

