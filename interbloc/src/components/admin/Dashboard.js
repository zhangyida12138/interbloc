import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';
import { getAllServers, getPagedTenants, getPagedUsers } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faDatabase, faUser } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import '../../styles/Dashboard.css';

function Dashboard() {
  const [serverCount, setServerCount] = useState(0);
  const [databaseCount, setDatabaseCount] = useState(0);
  const [tenantCount, setTenantCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [tenantUserData, setTenantUserData] = useState([]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4567', '#009900', '#FF7F50', '#6A5ACD', '#EE82EE'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverResponse = await getAllServers();
        if (serverResponse.success) {
          setServerCount(serverResponse.data.length);
          const totalDatabases = serverResponse.data.reduce((sum, server) => sum + server.databases.length, 0);
          setDatabaseCount(totalDatabases);
        }

        const tenantResponse = await getPagedTenants({ page: 1, pageSize: 100 });
        if (tenantResponse.success) {
          const tenants = tenantResponse.data.items;
          setTenantCount(tenants.length);
          let totalUserCount = 0;
          const tenantUserCounts = [];

          const tenantPromises = tenants.map(async (tenant) => {
            const userResponse = await getPagedUsers({ pageSize: 100, tenantId: tenant.id });
            if (userResponse.success) {
              totalUserCount += userResponse.data.totalItems;
              tenantUserCounts.push({
                customerName: tenant.customerName,
                userCount: userResponse.data.totalItems,
              });
            }
          });

          await Promise.all(tenantPromises);
          setUserCount(totalUserCount);
          setTenantUserData(tenantUserCounts);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  // Map tenant user data to display with specific colors
  const tenantsInfo = tenantUserData.map((tenant, index) => (
    <span key={index} className="tenant-info" style={{ color: COLORS[index % COLORS.length] }}>
      {tenant.customerName}: {tenant.userCount}
    </span>
  ));

  // Join tenant information with a separator
  const tenantsInfoString = tenantsInfo.reduce((acc, curr, index) => {
    return index === tenantsInfo.length - 1 ? [...acc, curr] : [...acc, curr, '； '];
  }, []);

  return (
    <div className="dashboard-container">
      <CustomNavbar />
      <Container className="mt-4">
        <div className="dashboard-row">
          <div className="dashboard-col">
            <h2>Dashboard</h2>
          </div>
        </div>
        <div className="dashboard-row spaced-row">
          <div className="dashboard-col card-col">
            <Card className="dashboard-card">
              <Card.Body>
                <div className="icon-container">
                  <FontAwesomeIcon icon={faServer} className="card-icon" />
                </div>
                <Card.Title>
                  <Link to="/admin/manage-server">Servers</Link>
                </Card.Title>
                <Card.Text>{serverCount}</Card.Text>
                <div className="card-footer">Checked</div>
              </Card.Body>
            </Card>
          </div>
          <div className="dashboard-col card-col">
            <Card className="dashboard-card">
              <Card.Body>
                <div className="icon-container">
                  <FontAwesomeIcon icon={faDatabase} className="card-icon" />
                </div>
                <Card.Title>
                  <Link to="/admin/manage-database">Databases</Link>
                </Card.Title>
                <Card.Text>{databaseCount}</Card.Text>
                <div className="card-footer">Efficient</div>
              </Card.Body>
            </Card>
          </div>
          <div className="dashboard-col card-col">
            <Card className="dashboard-card">
              <Card.Body>
                <div className="icon-container">
                  <FontAwesomeIcon icon={faUser} className="card-icon" />
                </div>
                <Card.Title>
                  <Link to="/admin/manage-tenant">Tenants</Link>
                </Card.Title>
                <Card.Text>{tenantCount}</Card.Text>
                <div className="card-footer">No issues</div>
              </Card.Body>
            </Card>
          </div>
          <div className="dashboard-col card-col">
            <Card className="dashboard-card">
              <Card.Body>
                <div className="icon-container">
                  <FontAwesomeIcon icon={faUser} className="card-icon" />
                </div>
                <Card.Title>Users</Card.Title>
                <Card.Text>{userCount}</Card.Text>
                <div className="card-footer">Stable activity</div>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="chart-container">
          <h5 className="tenants-info-title">Tenants Information</h5>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={tenantUserData}
                dataKey="userCount"
                nameKey="customerName"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {tenantUserData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="tenants-info">
            {tenantsInfoString}
          </div>
        </div>
        <div className="dashboard-row">
          <div className="dashboard-col">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
