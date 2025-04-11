import React from 'react';
import ChartContainer from '../components/ChartContainer';
import { Box, Typography, Grid } from '@mui/material';
import './OverviewPage.css'; // New CSS file

const OverviewPage = ({ fileData, headers }) => {
  if (!fileData || fileData.length === 0) {
    return (
      <Box className="empty-state">
        <Typography variant="h5" className="empty-state-title">
          📊 No Data Uploaded Yet
        </Typography>
        <Typography variant="body1" className="empty-state-subtitle">
          Please upload an Excel file to begin visualizing your data
        </Typography>
      </Box>
    );
  }

  // Prepare data for charts
  const numericHeaders = headers.filter(header => {
    return fileData.some(row => typeof row[header] === 'number');
  });

  if (numericHeaders.length < 2) {
    return (
      <Box className="empty-state">
        <Typography variant="h5" className="empty-state-title">
          🔍 Not Enough Numeric Data
        </Typography>
        <Typography variant="body1" className="empty-state-subtitle">
          The uploaded file needs at least 2 numeric columns for visualization
        </Typography>
      </Box>
    );
  }

  const labels = fileData.map(row => row[headers[0]]).slice(0, 10);
  const data1 = fileData.map(row => row[numericHeaders[0]]).slice(0, 10);
  const data2 = fileData.map(row => row[numericHeaders[1]]).slice(0, 10);

  const barData = {
    labels: labels,
    datasets: [
      {
        label: numericHeaders[0],
        data: data1,
        backgroundColor: 'rgba(67, 97, 238, 0.7)',
        borderColor: 'rgba(67, 97, 238, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: numericHeaders[1],
        data: data2,
        backgroundColor: 'rgba(72, 149, 239, 0.7)',
        borderColor: 'rgba(72, 149, 239, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: labels,
    datasets: [
      {
        data: data1,
        backgroundColor: [
          'rgba(67, 97, 238, 0.7)',
          'rgba(72, 149, 239, 0.7)',
          'rgba(76, 201, 240, 0.7)',
          'rgba(111, 207, 151, 0.7)',
          'rgba(247, 37, 133, 0.7)',
          'rgba(253, 126, 20, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box className="page-container">
      <Typography variant="h4" className="page-title" gutterBottom>
        Data Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ChartContainer 
            chartType="bar" 
            data={barData} 
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Comparative Analysis',
                  font: {
                    size: 16,
                    weight: 'bold'
                  }
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    drawBorder: false
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }} 
            title="Bar Chart Comparison" 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartContainer 
            chartType="pie" 
            data={pieData} 
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Distribution',
                  font: {
                    size: 16,
                    weight: 'bold'
                  }
                },
                legend: {
                  position: 'right',
                }
              },
              cutout: '60%',
            }} 
            title="Pie Chart Distribution" 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewPage;