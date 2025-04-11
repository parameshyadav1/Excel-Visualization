import React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import './FileUpload.css'; // New CSS file

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
      // Add visual feedback
      const uploadArea = document.querySelector('.upload-area');
      if (uploadArea) {
        uploadArea.classList.add('upload-success');
        setTimeout(() => uploadArea.classList.remove('upload-success'), 2000);
      }
    }
  };

  return (
    <div className="upload-area">
      <div className="upload-container">
        <CloudUploadIcon sx={{ fontSize: 60, color: '#4361ee', mb: 2 }} />
        <h2 className="upload-title">Drag & Drop or Click to Upload</h2>
        <p className="upload-subtitle">Excel files only (.xlsx, .xls, .csv)</p>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          className="fancy-btn"
          sx={{
            mt: 2,
            background: 'linear-gradient(135deg, #4361ee 0%, #4895ef 100%)',
            borderRadius: '25px',
            padding: '12px 24px',
            boxShadow: '0 4px 15px rgba(67, 97, 238, 0.3)',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 6px 20px rgba(67, 97, 238, 0.4)'
            }
          }}
        >
          Select File
          <VisuallyHiddenInput 
            type="file" 
            accept=".xlsx, .xls, .csv" 
            onChange={handleFileChange} 
          />
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;