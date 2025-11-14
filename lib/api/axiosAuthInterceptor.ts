import { AxiosInstance } from 'axios';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any) => {
  failedQueue.forEach(prom =>
    error ? prom.reject(error) : prom.resolve()
  );
  failedQueue = [];
};

export const attachAuthInterceptor = (
  axiosInstance: AxiosInstance
) => {
  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      const isAuthEndpoint = [
        '/auth/refresh',
        '/auth/login',
        '/auth/register',
      ].some(endpoint =>
        originalRequest.url?.includes(endpoint)
      );

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isAuthEndpoint
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => axiosInstance(originalRequest));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await axiosInstance.post('/auth/refresh');
          processQueue(null);
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);

          if (typeof window !== 'undefined') {
            const { useAuthStore } = await import(
              '@/lib/store/authStore'
            );
            useAuthStore.getState().clearAuth();

            if (
              !window.location.pathname.startsWith('/auth')
            ) {
              window.location.href = '/auth/login';
            }
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
