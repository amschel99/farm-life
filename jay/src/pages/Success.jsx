import React, { useState } from 'react';
import { Button } from '@mui/material';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';

const Success = ({ user }) => {
  const [name, setName] = useState('John Doe');
  const cart = useSelector((state) => state.cart);
  const { items } = cart;
  const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'RD11';
    for (let i = 0; i < length - 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  const generatePdf = () => {
    const doc = new jsPDF();

    // Add receipt header
    doc.setFontSize(18);
    doc.text(`Receipt for ${user}`, 14, 22);
    doc.text(`transaction Id ${generateRandomString(10)}`, 14, 28);

    // Add date
    doc.setFontSize(12);
    doc.text(`Date downloaded ${new Date().toLocaleDateString()}`, 14, 32);

    // Add item list
    doc.setFontSize(14);
    let startY = 60;
    items.forEach((item) => {
      const text = `Name: ${item.name}\nQuantity: ${
        item.quantity ? item.quantity : 1
      }\nPrice: ${item.price}`;
      doc.text(text, 14, startY);
      startY += 25;
    });

    // Add thank you message and contact details
    doc.setFontSize(12);
    doc.text('Thank you for your business!', 14, startY + 30);
    doc.text('Contact us at 0792213201', 14, startY + 40);

    // Save the PDF
    doc.save('example.pdf');
  };

  return <Button onClick={generatePdf}>Download receipt</Button>;
};

export default Success;
