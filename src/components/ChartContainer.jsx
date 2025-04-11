import React from 'react';
import { Bar, Pie, Line, Doughnut, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { saveAs } from 'file-saver';
import { Button, Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './ChartContainer.css'; // New CSS file

const ChartContainer = ({ chartType, data, options, title }) => {
  const renderChart = () => {
    const chartOptions = {
      ...options,
      plugins: {
        ...options?.plugins,
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      },
      maintainAspectRatio: false
    };

    switch (chartType) {
      case 'bar':
        return <Bar data={data} options={chartOptions} />;
      case 'pie':
        return <Pie data={data} options={chartOptions} />;
      case 'line':
        return <Line data={data} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={chartOptions} />;
      case 'scatter':
        return <Scatter data={data} options={chartOptions} />;
      default:
        return <Bar data={data} options={chartOptions} />;
    }
  };

  const downloadChart = (format) => {
    const canvas = document.querySelector(`#${chartType}-chart canvas`);
    if (canvas) {
      canvas.toBlob((blob) => {
        saveAs(blob, `${title}_${chartType}.${format}`);
      }, `image/${format}`, 1);
    }
  };

  return (
    <Card className="fancy-card" sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {title}
          </Typography>
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Box sx={{ height: '400px', position: 'relative' }} id={`${chartType}-chart`}>
          {renderChart()}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<ImageIcon />}
            onClick={() => downloadChart('png')}
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              borderWidth: '2px',
              '&:hover': { borderWidth: '2px' }
            }}
          >
            Save as PNG
          </Button>
          <Button
            variant="contained"
            startIcon={<PictureAsPdfIcon />}
            onClick={() => downloadChart('pdf')}
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #4361ee 0%, #3f37c9 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #3f37c9 0%, #4361ee 100%)'
              }
            }}
          >
            Save as PDF
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartContainer;