async function generateThumbnail(pdf) {
    // If the input is a string, assume it's a URL and fetch the PDF
    if (typeof pdf === 'string') {
      const response = await fetch(pdf);
      pdf = await response.arrayBuffer();
    }
    
    // Load the PDF into a PDF.js document
    const loadingTask = pdfjsLib.getDocument({data: pdf});
    const pdfDocument = await loadingTask.promise;
    
    // Get the first page of the PDF
    const page = await pdfDocument.getPage(1);
    
    // Set the desired width and height of the thumbnail
    const desiredWidth = 200;
    const desiredHeight = Math.round(desiredWidth * (page.view[3] / page.view[2]));
    
    // Render the page as a canvas
    const canvas = document.createElement('canvas');
    canvas.width = desiredWidth;
    canvas.height = desiredHeight;
    const renderContext = {
      canvasContext: canvas.getContext('2d'),
      viewport: page.getViewport({scale: 1})
    };
    await page.render(renderContext).promise;
    
    // Convert the canvas to a data URL and return it
    const dataURL = canvas.toDataURL('image/png');
    return dataURL;
  }
  export default generateThumbnail;