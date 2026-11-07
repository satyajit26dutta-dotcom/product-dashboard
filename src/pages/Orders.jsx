import { useState, useEffect } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) return <div className="p-6 text-center">No orders placed yet.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border p-4 rounded shadow bg-white">
            <div className="flex justify-between border-b pb-2 mb-2">
              <span className="font-bold">Order ID: #{order.id}</span>
              <span className="text-gray-500">{order.date}</span>
            </div>
            <p><strong>Customer Name:</strong> {order.name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <div className="mt-2">
              <h4 className="font-semibold">Items:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {order.cart.map((item, idx) => (
                  <li key={idx}>{item.name} (Qty: {item.quantity}) - ₹{item.price * item.quantity}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}