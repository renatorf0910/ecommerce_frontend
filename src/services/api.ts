import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export async function registerAndLogin(userData: { email: string; username: string; password: string }) {
  try {
    await api.post('register/', userData);
    const loginResponse = await login({ username: userData.username, password: userData.password });
    return loginResponse;
  } catch (error) {
    throw error;
  }
}


export async function login(credentials: { username: string; password: string }) {
  try {
    const response = await api.post('login/', credentials);

    const { access, refresh } = response.data;

    console.log('entrei?')
    localStorage.setItem('token', access);
    localStorage.setItem('refreshToken', refresh);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const token = localStorage.getItem('refreshToken');

    if (!token) {
      throw new Error('No refresh token found');
    }

    await api.post(
      'logout/',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    window.location.href = '/login';
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }
}

export const createProduct = async (formData: FormData) => {
  const response = await api.post('product/create/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


export default api;
