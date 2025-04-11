import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavTabs from './components/NavTabs';
import OverviewPage from './pages/OverviewPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DetailsPage from './pages/DetailsPage';
import * as XLSX from 'xlsx';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleFileUpload = (file) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      if (jsonData.length > 0) {
        setHeaders(Object.keys(jsonData[0]));
        setFileData(jsonData);
      }
      setIsLoading(false);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          {isLoading && <LoadingSpinner />}
          <NavTabs 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            fileData={fileData}
            setFileData={setFileData}
            headers={headers}
            setHeaders={setHeaders}
            onFileUpload={handleFileUpload}
          />
          <Routes>
            <Route path="/" element={
              <OverviewPage 
                fileData={fileData} 
                headers={headers} 
              />} 
            />
            <Route path="/analytics" element={
              <AnalyticsPage 
                fileData={fileData} 
                headers={headers} 
              />} 
            />
            <Route path="/details" element={
              <DetailsPage 
                fileData={fileData} 
                headers={headers} 
              />} 
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;