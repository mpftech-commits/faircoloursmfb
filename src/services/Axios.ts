import axios from "axios";

interface LoginResponse {
  user: {
    name: string;
    email: string;
    phone_number: string;
    password: string;
  };
}
interface CustomerResponse {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}
// interface CashierResponse {
//    name: string;
//     email: string;
//     password: string;

// }

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(api.defaults.baseURL);

// Request interceptor to add authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};
// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;
    }
    try {
      const res = await api.post("auth/refresh");
      const newAccessToken = res.data.accessToken;
      api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
      processQueue(null, newAccessToken);
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      localStorage.removeItem("token");
     if (!originalRequest.url.includes("/auth/login")){
       window.location.href = "/login";
     }
      return Promise.reject(error);
    }finally{
      isRefreshing = false;
    }
     
  },

 
);

export default api;

const LoginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error: string | any) {
    console.error(
      "Login error:",
      error.response?.data || error?.message || error,
    );
    throw error;
  }
};

export { LoginUser };

const SigninUser: () => Promise<LoginResponse> = async () => {
  const payload = {
    name: "name",
    email: "email",
    phone_number: "phone_number",
    password: "password",
  };
  try {
    const response = await api.post(`/auth/signup`, payload);
    return response.data;
  } catch (error: string | any) {
    console.error(
      "Signup error:",
      error.response?.data || error?.message || error,
    );
    throw error;
  }
};

export { SigninUser };

// create customer
const CreateCustomer: () => Promise<CustomerResponse> = async () => {
  const payload = {
    firstName: "firstName",
    lastName: "lastName",
    phone: "phone",
    address: "address",
  };
  try {
    const response = await api.post(`/customers`, payload);
    return response.data;
  } catch (error: string | any) {
    console.error(
      "Create customer error:",
      error.response?.data || error?.message || error,
    );
    throw error;
  }
};
export { CreateCustomer };

// create Cashier
const CreateCashier = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post(`/users/cashiers`, payload);
    return response.data;
  } catch (error: string | any) {
    console.error(
      "Create cashier error:",
      error.response?.data || error?.message || error,
    );
    throw error;
  }
};
export { CreateCashier };

const GetCustomers = async (page: number, limit = 10) => {
  try {
    const response = await api.get(`/customers`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error: string | any) {
    console.error(
      "error fetching customers:",
      error.response?.data || error?.message || error,
    );
    throw error;
  }
};
export { GetCustomers };
