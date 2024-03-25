import React from 'react';

const OrderPlacedPage = ({ orderDetails }) => {
    return (
        <div className="order-placed-container">
            <h2 className="order-placed-title">Order Placed Successfully!</h2>
            <div className="order-details">
                <p><strong>Order ID:</strong> {orderDetails?.orderId}</p>
                <p><strong>Total Amount:</strong> ${orderDetails?.totalAmount}</p>
                <p><strong>Items:</strong></p>
                
        </div>
    </div >
  );
}

export default OrderPlacedPage;