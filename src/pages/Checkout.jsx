import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', pincode: '' });
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.phone || !form.address || !form.pincode) {
      alert('Please fill all required fields.');
      return;
    }

    if (isNaN(form.phone) || form.phone.length < 10) {
      alert('Phone number must be numeric and at least 10 digits.');
      return;
    }

    if (isNaN(form.pincode)) {
      alert('Pincode must be numeric.');
      return;
    }

    const newOrder = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleDateString(),
      cart: JSON.parse(localStorage.getItem('cart')) || []
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');

    alert('Order placed successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Checkout Form</h2>
      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input type="text" placeholder="John Doe" onChange={e => setForm({...form, name: e.target.value})} className="w-full border p-2 rounded mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" placeholder="john@example.com" onChange={e => setForm({...form, email: e.target.value})} className="w-full border p-2 rounded mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input type="text" placeholder="9876543210" onChange={e => setForm({...form, phone: e.target.value})} className="w-full border p-2 rounded mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input type="text" placeholder="123 Street Name" onChange={e => setForm({...form, address: e.target.value})} className="w-full border p-2 rounded mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Pincode</label>
          <input type="text" placeholder="700001" onChange={e => setForm({...form, pincode: e.target.value})} className="w-full border p-2 rounded mt-1" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-medium">Place Order</button>
      </form>
    </div>
  );
}