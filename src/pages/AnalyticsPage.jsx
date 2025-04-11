import React from 'react';
import ChartContainer from '../components/ChartContainer';
// import { Box } from '@mui/material';
import { Box, Typography } from '@mui/material'; 

const AnalyticsPage = ({ fileData, headers }) => {
  if (!fileData || fileData.length === 0) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6">Please upload an Excel file to view data visualizations</Typography>
      </Box>
    );
  }

  const numericHeaders = headers.filter(header => {
    return fileData.some(row => typeof row[header] === 'number');
  });

  if (numericHeaders.length < 2) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6">The uploaded file doesn't contain enough numeric data for visualization</Typography>
      </Box>
    );
  }

  const labels = fileData.map(row => row[headers[0]]).slice(0, 10);
  const data1 = fileData.map(row => row[numericHeaders[0]]).slice(0, 10);
  const data2 = fileData.map(row => row[numericHeaders[1]]).slice(0, 10);

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: numericHeaders[0],
        data: data1,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
      {
        label: numericHeaders[1],
        data: data2,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: `${numericHeaders[0]} vs ${numericHeaders[1]}`,
        data: fileData.slice(0, 20).map(row => ({
          x: row[numericHeaders[0]],
          y: row[numericHeaders[1]],
        })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <Box sx={{ padding: 3 }}>
      <ChartContainer 
        chartType="line" 
        data={lineData} 
        options={{ responsive: true }} 
        title="Line Chart Trend" 
      />
      <ChartContainer 
        chartType="scatter" 
        data={scatterData} 
        options={{ 
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: numericHeaders[0],
              }
            },
            y: {
              title: {
                display: true,
                text: numericHeaders[1],
              }
            }
          }
        }} 
        title="Scatter Plot Correlation" 
      />
    </Box>
  );
};

export default AnalyticsPage;