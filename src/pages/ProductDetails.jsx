import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="p-6 text-center">Product not found.</div>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate('/products')} className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
        &larr; Back to Products
      </button>
      <div className="grid grid-cols-2 gap-8 bg-white p-6 rounded shadow">
        <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded" />
        <div>
          <span className="text-sm text-gray-500 uppercase">{product.category}</span>
          <h2 className="text-3xl font-bold mt-1">{product.name}</h2>
          <p className="text-2xl font-semibold text-blue-600 mt-2">₹{product.price}</p>
          <p className="text-sm text-yellow-500 mt-1">Rating: ⭐ {product.rating}</p>
          <p className="text-sm text-gray-600 mt-4">{product.description}</p>
          <p className="mt-4 font-medium">Availability: <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>{product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}</span></p>
          
          <button 
            onClick={addToCart}
            disabled={product.stock === 0}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}