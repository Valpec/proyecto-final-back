import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './PurchaseDetails.css';

const PurchaseDetails = () => {
  const { ticket } = useContext(CartContext);

  if (!ticket) {
    return <div>No hay información de la compra disponible.</div>;
  }

  return (
    <div className="purchase-details-container">
      <div className="purchase-details-header">
        <h2>Se ha realizado su compra:</h2>
      </div>

      <div className="ticket-info">
        <p>Code: {ticket.newTicket.code}</p>
        <p>Date: {ticket.newTicket.purchase_datetime}</p>
        <p>Amount: {ticket.newTicket.amount}</p>
        <p>Purchaser: {ticket.newTicket.purchaser}</p>
      </div>

      {ticket.notInStock.length > 0 && (
        <div className="not-in-stock-info">
          <h4>Se han removido los siguientes productos por no poder cumplir con el stock solicitado:</h4>
          <div className="item-list">
            {ticket.notInStock.map(item => (
              <div className="item" key={item.product._id}>
                <p>{item.product.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseDetails