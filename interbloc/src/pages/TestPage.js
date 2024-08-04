// import React, { useState } from 'react';
// import { signIn, getToken } from '../AuthService';
// import { 
//   addUser, toggleUserStatus, getPagedUsers, createDatabase, createServer, 
//   getAllServers, createTenant, updateTenant, getPagedTenants, disableTenant 
// } from '../api';

// const TestPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [userType, setUserType] = useState('admin'); // 'admin' or 'customer'
//   const [token, setToken] = useState(null);
//   const [error, setError] = useState(null);
//   const [result, setResult] = useState('');

//   const [userData, setUserData] = useState({});
//   const [tenantData, setTenantData] = useState({});
//   const [databaseData, setDatabaseData] = useState({});
//   const [serverData, setServerData] = useState({});
//   const [filterData, setFilterData] = useState({});

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signIn(username, password, userType);
//       const token = await getToken(); // Get JWT Token after login
//       setToken(token);
//       setError(null);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleInputChange = (e, setData) => {
//     setData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
//   };

//   const handleApiCall = async (apiFunction, data) => {
//     try {
//       const response = await apiFunction(data);
//       setResult(JSON.stringify(response, null, 2)); // Ensure correct response logging
//     } catch (error) {
//       setResult(error.message);
//     }
//   };

//   if (!token) {
//     return (
//       <div>
//         <h1>Login</h1>
//         <form onSubmit={handleLogin}>
//           <div>
//             <label>Username:</label>
//             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </div>
//           <div>
//             <label>User Type:</label>
//             <select value={userType} onChange={(e) => setUserType(e.target.value)}>
//               <option value="admin">Admin</option>
//               <option value="customer">Customer</option>
//             </select>
//           </div>
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Test Page</h1>
//       {userType === 'admin' ? (
//         <div>
//         <div>
//           <h3>Create Database</h3>
//           <input type="text" name="dbName" placeholder="Database Name" onChange={(e) => handleInputChange(e, setDatabaseData)} />
//           <input type="text" name="serverId" placeholder="Server ID" onChange={(e) => handleInputChange(e, setDatabaseData)} />
//           <button onClick={() => handleApiCall(createDatabase, databaseData)}>Create Database</button>
//         </div>
//         <div>
//           <h3>Create Server</h3>
//           <input type="text" name="host" placeholder="Host" onChange={(e) => handleInputChange(e, setServerData)} />
//           <input type="number" name="portNumber" placeholder="Port Number" onChange={(e) => handleInputChange(e, setServerData)} />
//           <button onClick={() => handleApiCall(createServer, serverData)}>Create Server</button>
//         </div>
//         <div>
//           <h3>Get All Servers</h3>
//           <button onClick={() => handleApiCall(getAllServers, {})}>Get Servers</button>
//         </div>
//         <div>
//           <h3>Create Tenant</h3>
//           <input type="text" name="customerName" placeholder="Customer Name" onChange={(e) => handleInputChange(e, setTenantData)} />
//           <input type="text" name="logoUrl" placeholder="Logo URL" onChange={(e) => handleInputChange(e, setTenantData)} />
//           <input type="text" name="databaseId" placeholder="Database ID" onChange={(e) => handleInputChange(e, setTenantData)} />
//           <button onClick={() => handleApiCall(createTenant, tenantData)}>Create Tenant</button>
//         </div>
//         <div>
//           <h3>Update Tenant</h3>
//           <input type="text" name="id" placeholder="Tenant ID" onChange={(e) => handleInputChange(e, setTenantData)} />
//           <input type="text" name="customerName" placeholder="Customer Name" onChange={(e) => handleInputChange(e, setTenantData)} />
//           <input type="text" name="logoUrl" placeholder="Logo URL" onChange={(e) => handleInputChange(e, setTenantData)} />
//           <input type="checkbox" name="archived" onChange={(e) => handleInputChange(e, setTenantData)} /> Archived
//           <button onClick={() => handleApiCall(updateTenant, tenantData)}>Update Tenant</button>
//         </div>
//         <div>
//           <h3>Get Paged Tenants</h3>
//           <input type="number" name="show" placeholder="Show" onChange={(e) => handleInputChange(e, setFilterData)} />
//           <input type="number" name="pageSize" placeholder="Page Size" onChange={(e) => handleInputChange(e, setFilterData)} />
//           <input type="number" name="currentPage" placeholder="Current Page" onChange={(e) => handleInputChange(e, setFilterData)} />
//           <input type="number" name="sortOrder" placeholder="Sort Order" onChange={(e) => handleInputChange(e, setFilterData)} />
//           <button onClick={() => handleApiCall(getPagedTenants, filterData)}>Get Tenants</button>
//         </div>
//         <div>
//           <h3>Disable Tenant</h3>
//           <input type="text" name="id" placeholder="Tenant ID" onChange={(e) => handleInputChange(e, setTenantData)} />
//           <input type="checkbox" name="disable" onChange={(e) => handleInputChange(e, setTenantData)} /> Disable
//           <button onClick={() => handleApiCall(disableTenant, tenantData)}>Disable Tenant</button>
//         </div>
//       </div>
//       ) : (
//         <div>
//           <div>
//             <h3>Add User to Tenant</h3>
//             <input type="text" name="id" placeholder="User ID" onChange={(e) => handleInputChange(e, setUserData)} />
//             <input type="text" name="username" placeholder="Username" onChange={(e) => handleInputChange(e, setUserData)} />
//             <input type="text" name="tenantId" placeholder="Tenant ID" onChange={(e) => handleInputChange(e, setUserData)} />
//             <input type="text" name="group" placeholder="Group" onChange={(e) => handleInputChange(e, setUserData)} />
//             <input type="text" name="displayName" placeholder="Display Name" onChange={(e) => handleInputChange(e, setUserData)} />
//             <button onClick={() => handleApiCall(addUser, userData)}>Add User</button>
//           </div>
//           <div>
//             <h3>Toggle User Status</h3>
//             <input type="text" name="id" placeholder="User ID" onChange={(e) => handleInputChange(e, setUserData)} />
//             <input type="checkbox" name="enabled" onChange={(e) => handleInputChange(e, setUserData)} /> Enabled
//             <button onClick={() => handleApiCall(toggleUserStatus, userData)}>Toggle Status</button>
//           </div>
//           <div>
//          /* This part of the code in the TestPage component is responsible for fetching a paged list of
//          users associated with a specific tenant. Here's a breakdown of what it does: */
//           /* The user can input a tenant ID, page size, and current page number to fetch a paged list of users. */
//           /* The `handleInputChange` function updates the `filterData` state based on the input values. */
//           /* The `handleApiCall` function calls the `getPagedUsers` API function with the `filterData` as input. */
//             <h3>Get Paged Users for a Tenant</h3>
//             <input type="text" name="tenantId" placeholder="Tenant ID" onChange={(e) => handleInputChange(e, setFilterData)} />
//             <input type="number" name="pageSize" placeholder="Page Size" onChange={(e) => handleInputChange(e, setFilterData)} />
//             <input type="number" name="currentPage" placeholder="Current Page" onChange={(e) => handleInputChange(e, setFilterData)} />
//             <button onClick={() => handleApiCall(getPagedUsers, filterData)}>Get Paged Users</button>
//           </div>
//         </div>
        
//       )}
//       <pre>{result}</pre>
//     </div>
//   );
// };

// export default TestPage;
