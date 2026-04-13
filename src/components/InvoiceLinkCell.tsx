"use client";

import React from "react";

export const InvoiceLinkCell: React.FC<any> = ({ rowData, cellData }) => {
  const orderNumber = rowData?.orderNumber;
  const link = orderNumber ? `/invoice/${orderNumber}` : cellData;

  if (!link) return <span>-</span>;
  
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{
        backgroundColor: '#12B5CB', 
        color: 'white', 
        padding: '4px 8px', 
        borderRadius: '4px', 
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '12px',
        display: 'inline-block'
      }}
    >
      Generate Invoice
    </a>
  );
};
