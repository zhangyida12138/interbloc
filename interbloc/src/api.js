import axios from 'axios';
import { getToken } from './AuthService';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000', // Local Express server address
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add JWT Token to request headers
apiClient.interceptors.request.use(async (config) => {
    const token = await getToken();
    config.headers.Authorization = `Bearer ${token}`;
    // console.log(`Setting Authorization Header: Bearer ${token}`);
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle errors
apiClient.interceptors.response.use((response) => {
    console.log('response data:', response);
    return response;
}, (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
});


// customer userpool
// Add a user
export const addUser = async (userData) => {
    try {
        const response = await apiClient.post('/api/v1/admin/user/add', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Toggle user status (enable/disable)
export const toggleUserStatus = async (userId, enabled) => {
    try {
        const response = await apiClient.put(`/api/v1/admin/user/toggleStatus?id=${userId}&enabled=${enabled}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Get paginated user list
export const getPagedUsers = async (params) => {
    try {
        const response = await apiClient.post('/api/v1/admin/user/paged', params);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};



// admin userpool
// Create a database
export const createDatabase = async (dbData) => {
    try {
        const response = await apiClient.post('/api/v1/admin/database/create', dbData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Create a server
export const createServer = async (serverData) => {
    try {
        const response = await apiClient.post('/api/v1/admin/server/create', serverData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Get all servers and databases
export const getAllServers = async () => {
    try {
        const response = await apiClient.get('/api/v1/admin/server/all');
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Create a tenant
export const createTenant = async (tenantData) => {
    try {
        const response = await apiClient.post('/api/v1/admin/tenant/create', tenantData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Update a tenant
export const updateTenant = async (tenantData) => {
    try {
        const response = await apiClient.post('/api/v1/admin/tenant/update', tenantData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Get paginated tenant data
export const getPagedTenants = async (filterData) => {
    try {
        const response = await apiClient.post('/api/v1/admin/tenant/paged', filterData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Disable a tenant
export const disableTenant = async (tenantId, disable) => {
    try {
        const response = await apiClient.post(`/api/v1/admin/tenant/disable?id=${tenantId}&disable=${disable}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};


// new api admin userpool
// Create Cognito account
export const createCognitoAccount = async (cognitoData) => {
    try {
        const response = await apiClient.post('/api/v1/admin/cognito/create', cognitoData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Toggle Cognito account status (enable/disable)
export const toggleCognitoAccountStatus = async (userId, enabled) => {
    try {
        const response = await apiClient.put(`/api/v1/admin/cognito/toggleStatus?id=${userId}&enabled=${enabled}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Survey endpoints (these should be verified against actual API)
export const createSurvey = async (surveyData) => {
    try {
        const response = await apiClient.post('/api/v1/admin/survey/create', surveyData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

export const updateSurvey = async (surveyData) => {
    try {
        const response = await apiClient.post('/api/v1/admin/survey/update', surveyData);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

export const toggleSurveyStatus = async (surveyId, enabled) => {
    try {
        const response = await apiClient.post('/api/v1/admin/survey/toggle', { id: surveyId, enabled });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

export const getSurveyById = async (surveyId) => {
    try {
        const response = await apiClient.get(`/api/v1/admin/survey/get?id=${surveyId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

export const getPagedSurveys = async (params) => {
    try {
        const response = await apiClient.get('/api/v1/admin/survey/paged',  params );
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};
