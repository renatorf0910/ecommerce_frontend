import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: false,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

function getAccessToken() {
  return localStorage.getItem('token');
}

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await api.post('token/refresh/', {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;

        localStorage.setItem('token', newAccessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export async function registerAndLogin(userData: { email: string; username: string; password: string, password_confirm: string, phone: string }) {
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

export const getProducts = async () => {
  const response = await api.get('products/');
  return response.data;
};

export const getProductsOwner = async () => {
  const response = await api.get('products/myproducts/');
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`products/product/${id}/`);
  return response.data;
};

export const getProductImageById = async (id: string) => {
  const response = await api.get(`products/product_image/${id}/`);
  return response.data;
};

export default api;
