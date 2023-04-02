import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

const DownloadReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/order/fetch');
      setData(result.data);
    };
    fetchData();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Farmlife Report', 14, 16);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 24);

    let y = 40;
    data.forEach((order, index) => {
      doc.text(`Order by ${order.user }`, 14, y);
      y += 8;

      order.items.forEach((item) => {
        doc.text(`- ${item.name}: ${item.price} x ${item.quantity?item.quantity:1}`, 14, y);
        y += 6;
      });

      doc.text(`Total: ${order.price}`, 14, y);
      y += 10;
    });

    doc.save('farmlife_report.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF}>Download Report</button>
    </div>
  );
};

export default DownloadReport;
