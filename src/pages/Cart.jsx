import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const finalTotal = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty.</h2>
        <button onClick={() => navigate('/products')} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="bg-white p-6 rounded shadow space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-gray-500">₹{item.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">-</button>
                <span className="px-4">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">+</button>
              </div>
              <p className="font-bold w-20 text-right">₹{item.price * item.quantity}</p>
              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 ml-2">Remove</button>
            </div>
          </div>
        ))}
        <div className="mt-6 pt-4 border-t space-y-2 text-right">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Tax (5%): ₹{tax}</p>
          <p className="font-bold text-xl">Final Total: ₹{finalTotal}</p>
          <button onClick={() => navigate('/checkout')} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}