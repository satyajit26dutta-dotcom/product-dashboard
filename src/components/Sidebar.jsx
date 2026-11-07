import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };
  return (
    <div className="w-64 bg-slate-800 text-white h-screen p-6 flex flex-col justify-between sticky top-0">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-blue-400">Manu</h2>
        <nav className="space-y-4 flex flex-col">
          <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
          <Link to="/products" className="hover:text-blue-300">Products</Link>
          <Link to="/cart" className="hover:text-blue-300">Cart</Link>
          <Link to="/orders" className="hover:text-blue-300">Orders</Link>
        </nav>
      </div>
      <button onClick={handleLogout} className="bg-red-600 py-2 rounded text-center hover:bg-red-700">
        Logout
      </button>
    </div>
  );
}