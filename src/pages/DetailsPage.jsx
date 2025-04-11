import React from 'react';
import ChartContainer from '../components/ChartContainer';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DetailsPage = ({ fileData, headers }) => {
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

  if (numericHeaders.length < 1) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6">The uploaded file doesn't contain numeric data for visualization</Typography>
      </Box>
    );
  }

  const labels = fileData.map(row => row[headers[0]]).slice(0, 10);
  const data1 = fileData.map(row => row[numericHeaders[0]]).slice(0, 10);

  const doughnutData = {
    labels: labels,
    datasets: [
      {
        data: data1,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <Box sx={{ padding: 3 }}>
      <ChartContainer 
        chartType="doughnut" 
        data={doughnutData} 
        options={{ responsive: true }} 
        title="Donut Chart Distribution" 
      />
      
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Sample Data (First 10 rows)
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {fileData.slice(0, 10).map((row, index) => (
              <TableRow key={index}>
                {headers.map(header => (
                  <TableCell key={`${index}-${header}`}>
                    {row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DetailsPage;