import { useEffect, useState } from 'react';
import { products } from '../data/Products';

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, cartCount: 0, cartValue: 0, orders: 0 });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const totalValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    setStats({
      products: products.length,
      cartCount: cart.reduce((acc, item) => acc + item.quantity, 0),
      cartValue: totalValue,
      orders: orders.length
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 shadow rounded border-l-4 border-blue-500">
          <p className="text-gray-500">Total Products</p>
          <h3 className="text-2xl font-bold mt-1">{stats.products}</h3>
        </div>
        <div className="bg-white p-6 shadow rounded border-l-4 border-green-500">
          <p className="text-gray-500">Cart Items</p>
          <h3 className="text-2xl font-bold mt-1">{stats.cartCount}</h3>
        </div>
        <div className="bg-white p-6 shadow rounded border-l-4 border-yellow-500">
          <p className="text-gray-500">Total Cart Value</p>
          <h3 className="text-2xl font-bold mt-1">₹{stats.cartValue}</h3>
        </div>
        <div className="bg-white p-6 shadow rounded border-l-4 border-purple-500">
          <p className="text-gray-500">Total Orders</p>
          <h3 className="text-2xl font-bold mt-1">{stats.orders}</h3>
        </div>
      </div>
    </div>
  );
}