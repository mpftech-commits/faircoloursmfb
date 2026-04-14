import axios from "axios";

interface LoginResponse {
  user: {
    name: string;
    email: string;
    phone_number: string;
    password: string;
  };
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
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

const isAuthRequest = (url?: string) =>
  typeof url === "string" &&
  (url.includes("auth/login") || url.includes("auth/refresh"));

const redirectToLogin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && isAuthRequest(originalRequest?.url)) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || originalRequest?._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    if (!originalRequest.headers) {
      originalRequest.headers = {};
    }

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

    isRefreshing = true;

    try {
      const res = await api.post("/auth/refresh");
      const newAccessToken = res.data.accessToken;
      localStorage.setItem("token", newAccessToken);
      api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      redirectToLogin();
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;

const LoginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
      api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
    }
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

const LogoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.Authorization;
    return response.data;
  } catch (error: string | any) {
    console.error(
      "Logout error:",
      error.response?.data || error?.message || error,
    );
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.Authorization;
    throw error;
  }
};

export { LogoutUser };

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
type CustomerPayload = {
   title: string,
    surname: string,
    otherName: string,
    gender: string,
    maritalStatus: string,
    dateOfBirth: string,
    nationality: string,
    bvn: string,
    nin: string,
    meansOfIdentification: string,
    phone: string,
    email: string,
    address: string,
    businessAddress: string,
    occupation: string,
    employerName: string,
    employerAddress: string,
    bankName: string,
    accountName: string,
    accountNumber: string,
    nextOfKin: { fullName: string, phone: string, address: string },
    emergencyContact: { fullName: string, phone: string, address: string }
}
// create customer
const CreateCustomer = async (payload: CustomerPayload) => {
  try {
    const response = await api.post(`/customers`, payload);
    return response.data;
  } catch (error: any) {
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

// get cahshiers
const GetCashiers = async (page: number, limit = 10) => {
  try {
    const response = await api.get(`/users/cashiers`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error: string | any) {
    console.error(
      "error fetching cashiers:",
      error.response?.data || error?.message || error,
    );
    throw error;
  }
};
export { GetCashiers };

// get customers
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

// get transactions
const GetTransaction = async (page: number, limit = 10) => {
  try {
    const response = await api.get(`/transactions`, {
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
export { GetTransaction };

// get Loans
const GetLoans = async (page: number, limit = 10) => {
  try {
    const response = await api.get(`/loans`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error: string | any) {
    console.error(
      "error fetching loans:",
      error.response?.data || error?.message || error,
    );
    throw error;
  }
};
export { GetLoans };

// services/dashboard

export const getDashboardStats = async ({
  filter,
  startDate,
  endDate,
}: {
  filter: string;
  startDate?: string;
  endDate?: string;
}) => {
  const params: any = { filter };

  if (filter === "custom") {
    params.startDate = startDate;
    params.endDate = endDate;
  }

  const res = await api.get("/dashboard/admin", { params });

  return res.data; // { cards: {...} }
};
