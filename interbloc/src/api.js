const apiUrl = 'http://localhost:3000/api';
const authUrl = `${apiUrl}/auth`;
const addUserUrl = `${apiUrl}/addUserToCognito`;

export const getToken = async () => {
  try {
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API call failed with status ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    return result.IdToken;
  } catch (error) {
    throw error;
  }
};

export const addUserToCognito = async (username, email) => {
  try {
    const response = await fetch(addUserUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API call failed with status ${response.status}: ${errorText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.uuid;
  } catch (error) {
    throw error;
  }
};

export const callApi = async (path, method = 'POST', body, token) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    if (method !== 'GET' && method !== 'HEAD') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${apiUrl}${path}`, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API call failed with status ${response.status}: ${errorText}`);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    throw error;
  }
};

// 其他API函数保持不变...


// 添加用户
export const addUserToTenant = (user, token) => callApi('/v1/admin/user/add', 'POST', user, token);

// 获取分页用户
export const getPagedUsers = (params, token) => {
  const query = new URLSearchParams(params).toString();
  return callApi(`/v1/admin/user/paged?${query}`, 'GET', null, token);
};

// 切换用户状态
export const toggleUserStatus = (params, token) => {
  const query = new URLSearchParams(params).toString();
  return callApi(`/v1/admin/user/toggleStatus?${query}`, 'PUT', null, token);
};

// 创建数据库
export const createDatabase = (db, token) => callApi('/v1/admin/database/create', 'POST', db, token);

// 创建服务器
export const createServer = (server, token) => callApi('/v1/admin/server/create', 'POST', server, token);

// 获取所有服务器和数据库
export const getAllServers = (token) => callApi('/v1/admin/server/all', 'GET', null, token);

// 创建租户
export const createTenant = (tenant, token) => callApi('/v1/admin/tenant/create', 'POST', tenant, token);

// 更新租户
export const updateTenant = (tenant, token) => callApi('/v1/admin/tenant/update', 'POST', tenant, token);

// 获取分页租户数据
export const getPagedTenants = (params, token) => callApi('/v1/admin/tenant/paged', 'POST', params, token);

// 禁用租户
export const disableTenant = (params, token) => {
  const query = new URLSearchParams(params).toString();
  return callApi(`/v1/admin/tenant/disable?${query}`, 'POST', null, token);
};
