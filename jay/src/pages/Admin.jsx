import React, { useState } from "react";
import {Link} from "react-router-dom"
import { Stack, Button, TextField, Typography, Alert ,Grid} from "@mui/material";
const Admin = () => {
  const fileInputRef = React.useRef(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [ebook, setEbook] = useState("");
  const [file, setFile] = useState("");
  
  const onpenFile = () => {
    fileInputRef.current.click();
  
  };
const showFile=()=>{
  const book=fileInputRef.current.files[0];
    
    if( book ){
         setFile(book.name)
    }
   
}
  const handleValue = (e) => {
    setEbook(e.target.value);
  };
  const handleButtonClick = (e) => {
    
    setUploading("uploading ...");
    
    // Create a FormData object to send the file and metadata
    
    const formData = new FormData();
    if (fileInputRef.current.files[0]) {
      formData.append("file", fileInputRef.current.files[0]);
      formData.append("name", ebook);
    } else {
      // Handle the case where no file has been selected
      setUploading("");
      setError("Please select a file to upload.");
      return;
    }
    fetch("https://veestream.tech/file/upload", {
      method: "POST",
      headers: {
        apiKey: import.meta.env.VITE_API_KEY,
      },
      body: formData,
    })
      .then((response) => {
        // Remove the loading bar or progress indicator

        // Check if the response was successful
        if (!response.ok) {
          setError("Network response was not ok");
          setUploading("");
         
          
        } else {
          setSuccess("File uploaded successfully");
          setUploading("");
          setEbook("");
          e.target.reset;
          setFile("");

          // Parse the JSON response and display it in the response container
          return response.json();
        }
      })

      .catch((error) => {
        console.error("Error:", error);

        setError("An error occurred while uploading the file.");
      });
  };
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      {uploading && <Alert severity="success">{uploading}</Alert>}

      <Stack
        sx={{ width: "60vw", marginX: "20vw", marginTop: "30vh" }}
        direction="column"
      >
        <Typography
          component="h3"
          variant="h3"
          marginBottom="40px"
          sx={{ textAlign: "center", color: "green" }}
        >
          Upload an ebook
        </Typography>
        <TextField
          sx={{ marginY: "20px" }}
          type="text"
          label="ebook name"
          variant="outlined"
          onChange={handleValue}
        ></TextField>
        <Button
          variant="contained"
          color="success"
          onClick={onpenFile}
          sx={{ marginY: "20px" }}
        >
          Choose an ebook
        </Button>
        <input
          type="file"
          name="video"
          ref={fileInputRef}
          style={{
            display: "none",
          }}
          onChange={showFile}
        />
        {file && <Typography>{file}</Typography>}

<Grid item xs={12} sx={{ textAlign: 'right' }}>
       <Button
  
  variant="outlined"
  // color="success"
  onClick={handleButtonClick}
  
  // sx={{
  //   position: "fixed",
  //   bottom: 0,
  //   right: 0,
  //   margin: "16px",
  // }}
  
>
  Upload
</Button>
</Grid>
<Button component={Link} to='/report'>Download report</Button>
      </Stack>
    </>
  );
};

export default Admin;