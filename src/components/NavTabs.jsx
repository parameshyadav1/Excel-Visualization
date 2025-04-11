import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Tabs, Tab, Switch, Typography, Box } from '@mui/material';
import FileUpload from './FileUpload';

const NavTabs = ({ 
  darkMode, 
  toggleDarkMode, 
  fileData, 
  setFileData, 
  headers, 
  setHeaders,
  onFileUpload 
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" className="fancy-navbar">
        <Toolbar>
          <Typography variant="h6" color='blue' textAlign="center" component="div" sx={{ flexGrow: 1 }}>
            Excel Visualization Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Light</Typography>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
            <Typography>Dark</Typography>
          </Box>
        </Toolbar>
        <Tabs  value={value} onChange={handleChange} centered>
          <Tab label="Overview" component={Link}  to="/" />
          <Tab label="Analytics" component={Link} to="/analytics" />
          <Tab label="Details" component={Link} to="/details" color='red' />
        </Tabs>
      </AppBar>
      <FileUpload onFileUpload={onFileUpload} />
      {fileData && (
        <Typography variant="subtitle1" sx={{ padding: 2 }}>
          Loaded {fileData.length} rows from Excel file
        </Typography>
      )}
    </>
  );
};

export default NavTabs;