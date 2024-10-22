// BoMOrdersPage.js

import React from 'react';
import { useGetBOMsQuery } from '../services/api'; // Adjust the import path as necessary
import Header from './Header';
import './BoMOrdersPage.css';

const BoMOrdersPage = () => {
  const { data: boms, isLoading, error } = useGetBOMsQuery(); // Fetch BoMs

  if (isLoading) {
    return <p>Loading BoM Orders...</p>;
  }

  if (error) {
    return <p>Error fetching BoM Orders: {error.message}</p>;
  }

  return (
    <div>
      <Header title="List" titlePrefix="BoM Oders" />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Part Number</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Footprint</th>
            <th>Item Description</th>
          </tr>
        </thead>
        <tbody>
          {boms?.map((bom) => (
            <React.Fragment key={bom._id}>
              {bom.items.map((item, index) => (
                <tr key={index}>
                  {index === 0 && (
                    <>
                      <td rowSpan={bom.items.length}>{bom.name}</td>
                      <td rowSpan={bom.items.length}>{bom.description}</td>
                    </>
                  )}
                  <td>{item.partNumber}</td>
                  <td>{item.quantity}</td>
                  <td>{item.cost}</td>
                  <td>{item.footprint}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoMOrdersPage;
