import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import CustomNavbar from './CustomNavbar';
import '../../styles/Dashboard.css';

const data = [
  {
    "identifier": "ABC120",
    "description": "Large container",
    "contentType": "Electronics",
    "weight": 2000,
    "weight_unit":"KG",
    "arriving": "2023-07-10",
    "departing": "2024-06-05",
    "location": "Arriving"
  },
  {
    "identifier": "ABC121",
    "description": "Frozen Food Container",
    "contentType": "Food",
    "weight": 2000,
    "weight_unit":"KG",
    "arriving": "2023-07-10",
    "departing": "2024-07-05",
    "location": "Arriving"
  },
  {
    "identifier": "ABC122",
    "description": "Large container",
    "contentType": "Electronics",
    "weight": 2000,
    "weight_unit":"KG",
    "arriving": "2023-07-10",
    "departing": "2024-06-05",
    "location": "Arriving"
  },
  {
    "identifier": "ABC123",
    "description": "Large container",
    "contentType": "Electronics",
    "weight": 2000,
    "weight_unit":"KG",
    "arriving": "2023-07-10",
    "departing": "2024-06-05",
    "location": "Arriving"
  },
  {
    "identifier": "ABC124",
    "description": "Frozen Food Container",
    "contentType": "Food",
    "weight": 2000,
    "weight_unit":"KG",
    "arriving": "2023-07-10",
    "departing": "2024-07-05",
    "location": "Arriving"
  },
  {
    "identifier": "ABC125",
    "description": "Large container",
    "contentType": "Electronics",
    "weight": 2000,
    "weight_unit":"KG",
    "arriving": "2023-07-10",
    "departing": "2024-06-05",
    "location": "Arriving"
  },
  {
    "identifier": "ABC126",
    "description": "Frozen Food Container",
    "contentType": "Food",
    "weight": 2000,
    "weight_unit":"KG",
    "arriving": "2023-07-10",
    "departing": "2024-07-05",
    "location": "Arriving"
  },
  {
    "identifier": "ABC127",
    "description": "Frozen Food Container",
    "contentType": "Empty",
    "weight": 1000,
    "weight_unit":"KG",
    "departing": "2024-07-10",
    "location": "Departing",
    "destination":"Aberdeen"
  },
  {
    "identifier": "ABC128",
    "description": "Rigging Loft Container",
    "contentType": "Lifting Equipment",
    "weight": 2000,
    "weight_unit":"KG",
    "departing": "2024-07-10",
    "location": "Departing",
    "destination":"Peterhead"
  },
  {
    "identifier": "ABC129",
    "description": "Frozen Food Container",
    "contentType": "Empty",
    "weight": 1000,
    "weight_unit":"KG",
    "departing": "2024-07-10",
    "location": "Departing",
    "destination":"Aberdeen"
  },
  {
    "identifier": "ABC130",
    "description": "Rigging Loft Container",
    "contentType": "Lifting Equipment",
    "weight": 2000,
    "weight_unit":"KG",
    "departing": "2024-07-10",
    "location": "Departing",
    "destination":"Peterhead"
  },
  {
    "identifier": "ABC131",
    "description": "Frozen Food Container",
    "contentType": "Empty",
    "weight": 1000,
    "weight_unit":"KG",
    "departing": "2025-07-10",
    "location": "On Asset"
  },
  {
    "identifier": "ABC132",
    "description": "small Container",
    "contentType": "Electronics",
    "weight": 2000,
    "weight_unit":"KG",
    "departing": "2025-07-10",
    "location": "On Asset"
  },
  {
    "identifier": "ABC133",
    "description": "Lubricant Tank",
    "contentType": "Lubricant",
    "weight": 1000,
    "weight_unit":"KG",
    "departing": "2024-07-10",
    "location": "On Asset"
  },
  {
    "identifier": "ABC134",
    "description": "diesel Tank",
    "contentType": "Fuel",
    "weight": 2000,
    "weight_unit":"KG",
    "departing": "2024-07-10",
    "location": "On Asset"
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const [arrivingCount, setArrivingCount] = useState(0);
  const [departingCount, setDepartingCount] = useState(0);
  const [onAssetCount, setOnAssetCount] = useState(0);

  useEffect(() => {
    const arriving = data.filter(container => container.location === "Arriving").length;
    const departing = data.filter(container => container.location === "Departing").length;
    const onAsset = data.filter(container => container.location === "On Asset").length;

    setArrivingCount(arriving);
    setDepartingCount(departing);
    setOnAssetCount(onAsset);
  }, []);

  const pieData = [
    { name: 'Arriving', value: arrivingCount },
    { name: 'Departing', value: departingCount },
    { name: 'On Asset', value: onAssetCount },
  ];

  return (
    <div className="dashboard-container">
      <CustomNavbar />
      <Container fluid className="mt-4">
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Containers Arriving</Card.Title>
                <Card.Text>{arrivingCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Containers Departing</Card.Title>
                <Card.Text>{departingCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Total Containers On Asset</Card.Title>
                <Card.Text>{onAssetCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6} className="d-flex justify-content-center">
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Identifier</th>
                  <th>Description</th>
                  <th>Content Type</th>
                  <th>Weight</th>
                  <th>Location</th>
                  <th>Arriving</th>
                  <th>Departing</th>
                </tr>
              </thead>
              <tbody>
                {data.map(container => (
                  <tr key={container.identifier}>
                    <td>{container.identifier}</td>
                    <td>{container.description}</td>
                    <td>{container.contentType}</td>
                    <td>{container.weight} {container.weight_unit}</td>
                    <td>{container.location}</td>
                    <td>{container.arriving || 'N/A'}</td>
                    <td>{container.departing || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
