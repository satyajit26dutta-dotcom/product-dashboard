import { useState } from 'react';
import { products } from '../data/Products';
import { Link } from 'react-router-dom';

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => category === 'All' || p.category === category)
    .sort((a, b) => {
      if (sort === 'low-high') return a.price - b.price;
      if (sort === 'high-low') return b.price - a.price;
      return 0;
    });

  const addToCart = (product) => {
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
    <div className="p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="flex gap-4 mb-6 flex-wrap">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1 min-w-48"
        />
        <select onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <select onChange={(e) => setSort(e.target.value)} className="border p-2 rounded">
          <option value="">Sort by Price</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-lg">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
          {filteredProducts.map(product => (
            <div key={product.id} className="border p-4 rounded shadow bg-white flex flex-col justify-between">
              <div>
                <img src={product.image} alt={product.name} className="h-48 w-full object-cover mb-2 rounded" />
                <Link to={`/products/${product.id}`} className="font-bold text-lg hover:text-blue-600 block">{product.name}</Link>
                <p className="text-xs text-gray-500">{product.category}</p>
                <p className="text-blue-600 font-semibold mt-1">₹{product.price}</p>
                <p className="text-xs text-yellow-500 mt-1">⭐ {product.rating} | Stock: {product.stock}</p>
              </div>
              <button 
                onClick={() => addToCart(product)} 
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}