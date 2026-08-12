const API_BASE = 'http://localhost:5000/api';

function getHeaders(token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  const jwtToken = token || localStorage.getItem('porao_token') || localStorage.getItem('porao_admin_token');
  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`;
  }
  return headers;
}

async function request(url, options = {}) {
  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const api = {
  auth: {
    register: (name, email, password) => 
      request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      }),
    login: (email, password) => 
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    getMe: () => request('/auth/me'),
  },
  products: {
    getAll: (category = '', search = '') => {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      const query = params.toString() ? `?${params.toString()}` : '';
      return request(`/products${query}`);
    },
    getCategories: () => request('/products/categories'),
    getOne: (id) => request(`/products/${id}`),
    create: (data) => 
      request('/products', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) => 
      request(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) => 
      request(`/products/${id}`, {
        method: 'DELETE',
      }),
  },
  orders: {
    create: (orderData) => 
      request('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      }),
    getMyOrders: () => request('/orders/my-orders'),
    getAllOrders: () => request('/orders'),
    updateStatus: (id, status) => 
      request(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),
  }
};
